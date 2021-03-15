import React, { FC, memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Link from '@fellesdatakatalog/link';
import moment from 'moment';

import translations from '../../lib/localization';
import { getTranslateText as translate } from '../../lib/translateText';
import { dateStringToDate, formatDate } from '../../lib/date-utils';

import { themeFDK } from '../../app/theme';

import withPublicService, {
  Props as PublicServiceProps
} from '../with-public-service';
import withPublicServices, {
  Props as PublicServicesProps
} from '../with-public-services';
import withConcepts, { Props as ConceptsProps } from '../with-concepts';
import withDatasets, { Props as DatasetsProps } from '../with-datasets';
import withEvents, { Props as EventsProps } from '../with-events';
import withKartverket, { Props as KartverketProps } from '../with-kartverket';
import withErrorBoundary from '../with-error-boundary';

import DetailsPage, {
  ContentSection,
  InlineList,
  KeyValueList,
  KeyValueListItem
} from '../details-page';
import ErrorPage from '../error-page';
import RelationList from '../relation-list';

import type { Theme } from '../../types';
import { Entity } from '../../types/enums';

import {
  PATHNAME_CONCEPTS,
  PATHNAME_DATASETS,
  PATHNAME_ORGANIZATIONS,
  PATHNAME_PUBLIC_SERVICES
} from '../../constants/constants';
import SC from './styled';

interface RouteParams {
  publicServiceId: string;
}

interface Props
  extends ConceptsProps,
    DatasetsProps,
    PublicServiceProps,
    PublicServicesProps,
    EventsProps,
    KartverketProps,
    RouteComponentProps<RouteParams> {}

const PublicServiceDetailsPage: FC<Props> = ({
  isLoadingPublicService,
  concepts,
  datasets,
  publicService,
  publicServices,
  publicServicesRequiredBy,
  publicServicesRelatedBy,
  eventsRelations,
  publicServicesRelations,
  publicServiceActions: {
    getPublicServiceRequested: getPublicService,
    resetPublicService
  },
  publicServicesActions: {
    getPublicServicesRequested: getPublicServices,
    resetPublicServices,
    getPublicServicesRequiredByRequested: getPublicServicesRequiredBy,
    resetPublicServicesRequiredBy,
    getPublicServicesRelatedByRequested: getPublicServicesRelatedBy,
    resetPublicServicesRelatedBy,
    getPublicServicesRelationsRequested: getPublicServicesRelations,
    resetPublicServicesRelations
  },
  conceptsActions: { getConceptsRequested: getConcepts },
  datasetsActions: { getDatasetsRequested: getDatasets },
  eventsActions: {
    getEventsRelationsRequested: getEventsRelations,
    resetEventsRelations
  },
  administrativeUnits,
  kartverketActions: {
    listAdministrativeUnitsRequested: listAdministrativeUnits,
    resetAdministrativeUnits
  },
  match: {
    params: { publicServiceId }
  }
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const entity = Entity.PUBLIC_SERVICE;
  const theme = { entityColours: themeFDK.extendedColors[entity] };

  const renderPage =
    isLoadingPublicService || !isMounted || publicService !== null;

  useEffect(() => {
    if (publicService?.id !== publicServiceId) {
      getPublicService(publicServiceId);
    }

    setIsMounted(true);

    return () => {
      setIsMounted(false);
      resetPublicService();
      resetPublicServices();
      resetPublicServicesRequiredBy();
      resetPublicServicesRelatedBy();
    };
  }, [publicServiceId]);

  useEffect(() => {
    if (publicService?.uri) {
      getPublicServicesRequiredBy({ requiredByServiceUri: publicService.uri });
      getPublicServicesRelatedBy({ relatedByServiceUri: publicService.uri });
    }
  }, [publicService?.uri]);

  const title = translate(publicService?.title);
  const description = translate(publicService?.description);
  const lastPublished = formatDate(
    dateStringToDate(publicService?.harvest?.firstHarvested)
  );
  const languages = publicService?.language ?? [];
  const sectors = publicService?.sector ?? [];
  const keywords =
    publicService?.keyword?.map(translate)?.filter(Boolean) ?? [];
  const requiredServices = publicService?.requires || [];
  const isClassifiedBy = publicService?.isClassifiedBy || [];
  const produces = publicService?.produces ?? [];
  const hasCriterion = publicService?.hasCriterion ?? [];
  const follows = publicService?.follows ?? [];
  const hasLegalResource = publicService?.hasLegalResource ?? [];
  const hasParticipation = publicService?.hasParticipation ?? [];
  const hasInput = publicService?.hasInput ?? [];
  const hasChannel = publicService?.hasChannel ?? [];
  const hasCost = publicService?.hasCost ?? [];
  const processingTime = publicService?.processingTime;
  const relation = publicService?.relation || [];
  const contactPoints = publicService?.hasContactPoint || [];
  const datasetsUris =
    (publicService?.isDescribedAt
      ?.map(({ uri }) => uri)
      .filter(Boolean) as string[]) ?? [];
  const publicServiceIdentifiers = [
    ...requiredServices.map(({ uri }) => uri).filter(Boolean),
    ...relation.map(({ uri }) => uri).filter(Boolean)
  ];
  const spatial = publicService?.spatial ?? [];

  const publicServicesMap = publicServices?.reduce(
    (previous, current) => ({ ...previous, [current.uri]: current }),
    {} as Record<string, any>
  );

  const conceptsIdentifiers = (isClassifiedBy.map(
    ({ uri }) => uri
  ) as string[]).filter(Boolean);

  const conceptsMap = concepts?.reduce(
    (previous, current) => ({ ...previous, [current.identifier]: current }),
    {} as Record<string, any>
  );

  const datasetsMap = datasets?.reduce(
    (previous, current) => ({ ...previous, [current.uri]: current }),
    {} as Record<string, any>
  );

  useEffect(() => {
    if (publicServiceIdentifiers.length > 0) {
      getPublicServices({ publicServiceIdentifiers, size: 1000 });
    }
  }, [publicServiceIdentifiers.join()]);

  useEffect(() => {
    if (conceptsIdentifiers.length > 0) {
      getConcepts({ identifiers: conceptsIdentifiers, size: 1000 });
    }
  }, [conceptsIdentifiers.join()]);

  useEffect(() => {
    if (datasetsUris.length > 0) {
      getDatasets({ uris: datasetsUris, size: 1000 });
    }
  }, [datasetsUris.join()]);

  useEffect(() => {
    if (publicService?.uri) {
      getEventsRelations({ relation: publicService.uri });
      getPublicServicesRelations({ requiresOrRelates: publicService.uri });
    }
    if (spatial.length > 0) {
      listAdministrativeUnits(spatial);
    }
    return () => {
      resetPublicServicesRelations();
      resetEventsRelations();
      resetAdministrativeUnits();
    };
  }, [publicService?.uri]);

  const themes: Theme[] = [];

  return renderPage ? (
    publicService && (
      <ThemeProvider theme={theme}>
        <SC.BetaRibbon>BETA</SC.BetaRibbon>
        <DetailsPage
          entity={entity}
          title={title}
          publisher={publicService?.hasCompetentAuthority?.[0]}
          entityId={publicService?.id}
          entityUri={publicService?.uri}
          lastPublished={lastPublished}
          isAuthoritative={false}
          isOpenData={false}
          isPublicData={false}
          isRestrictedData={false}
          isNonPublicData={false}
          themes={themes}
        >
          {description && (
            <ContentSection
              id='description'
              title={
                translations.detailsPage.sectionTitles.publicService.description
              }
              entityTheme={Entity.PUBLIC_SERVICE}
              truncate
            >
              {description}
            </ContentSection>
          )}

          {(languages.length > 0 ||
            sectors.length > 0 ||
            hasLegalResource.length > 0 ||
            hasChannel.length > 0 ||
            processingTime) && (
            <ContentSection
              id='usage'
              title={translations.detailsPage.sectionTitles.publicService.usage}
            >
              <KeyValueList>
                {hasChannel.length > 0 && (
                  <KeyValueListItem
                    property={
                      translations.detailsPage.sectionTitles.publicService
                        .channel
                    }
                    value={hasChannel
                      .map(({ type }) => translate(type?.prefLabel))
                      .filter(Boolean)
                      .join(', ')}
                  />
                )}
                {sectors.length > 0 && (
                  <KeyValueListItem
                    property={translations.industryCode}
                    value={sectors
                      .map(({ prefLabel }) => translate(prefLabel))
                      .filter(Boolean)
                      .join(', ')}
                  />
                )}
                {processingTime && (
                  <KeyValueListItem
                    property={
                      translations.detailsPage.sectionTitles.publicService
                        .processingTime
                    }
                    value={`${moment.duration(processingTime).asDays()} ${
                      translations.days
                    }`}
                  />
                )}
                {hasCost.length > 0 && (
                  <KeyValueListItem
                    property={
                      translations.detailsPage.sectionTitles.publicService.cost
                    }
                    value={hasCost
                      .map(
                        ({ uri, currency = '', description, value = '' }) => (
                          <SC.ListItemValue key={uri}>
                            {value}{' '}
                            {currency.substring(currency.lastIndexOf('/') + 1)}
                            {value || currency ? '. ' : ' '}
                            {translate(description)}
                          </SC.ListItemValue>
                        )
                      )
                      .filter(Boolean)}
                  />
                )}
                {hasLegalResource.length > 0 && (
                  <KeyValueListItem
                    property={
                      translations.detailsPage.sectionTitles.publicService
                        .legalResources
                    }
                    value={hasLegalResource
                      .map(({ description, uri, url }) => (
                        <Link key={uri} href={url} external>
                          {translate(description)}
                        </Link>
                      ))
                      .filter(Boolean)}
                  />
                )}
                {follows.length > 0 && (
                  <KeyValueListItem
                    property={
                      translations.detailsPage.sectionTitles.publicService
                        .follows
                    }
                    value={follows
                      .map(({ uri, description }) => (
                        <SC.ListItemValue key={uri}>
                          {translate(description)}
                        </SC.ListItemValue>
                      ))
                      .filter(Boolean)}
                  />
                )}
                {languages.length > 0 && (
                  <KeyValueListItem
                    property={translations.language}
                    value={languages
                      .map(({ prefLabel }) => translate(prefLabel))
                      .filter(Boolean)
                      .join(', ')}
                  />
                )}
                {administrativeUnits.map(({ uri, name }) => (
                  <KeyValueListItem
                    key={uri}
                    property={
                      translations.detailsPage.sectionTitles.publicService
                        .spatial
                    }
                    value={
                      uri ? (
                        <Link href={uri} external>
                          {translate(name) || uri}
                        </Link>
                      ) : (
                        translate(name) || uri
                      )
                    }
                  />
                ))}
              </KeyValueList>
            </ContentSection>
          )}

          {hasCriterion.length > 0 && (
            <ContentSection
              id='hasCriterion'
              title={
                translations.detailsPage.sectionTitles.publicService.criterion
              }
            >
              <KeyValueList>
                {hasCriterion.map(({ name, type }, index) => (
                  <KeyValueListItem
                    key={`${translate(name)}-${index}`}
                    property={translate(name)}
                    value={type
                      .map(({ prefLabel }) => translate(prefLabel))
                      .filter(Boolean)
                      .join(', ')}
                  />
                ))}
              </KeyValueList>
            </ContentSection>
          )}

          {produces.length > 0 && (
            <ContentSection
              id='produces'
              title={
                translations.detailsPage.sectionTitles.publicService.produces
              }
            >
              <KeyValueList>
                {produces.map(({ name, description }, index) => (
                  <KeyValueListItem
                    key={`${translate(name)}-${index}`}
                    property={translate(name)}
                    value={translate(description)}
                  />
                ))}
              </KeyValueList>
            </ContentSection>
          )}

          {hasInput.length > 0 && (
            <ContentSection
              id='hasInput'
              title={
                translations.detailsPage.sectionTitles.publicService.attachment
              }
            >
              <KeyValueList>
                {hasInput.map(({ name, description }, index) => (
                  <KeyValueListItem
                    key={`${translate(name)}-${index}`}
                    property={translate(name)}
                    value={translate(description)}
                  />
                ))}
              </KeyValueList>
            </ContentSection>
          )}

          {hasParticipation.length > 0 && (
            <ContentSection
              id='hasParticipation'
              title={
                translations.detailsPage.sectionTitles.publicService
                  .participation
              }
            >
              <KeyValueList>
                {hasParticipation.map(
                  ({ description, role, agents = [] }, index) => (
                    <KeyValueListItem
                      key={`${translate(description)}-${index}`}
                      property={
                        <>
                          {agents.map(
                            ({ uri, identifier, name, title }, index) => (
                              <SC.ListItemValue key={`${uri}-${index}`}>
                                <Link
                                  as={RouterLink}
                                  to={`${PATHNAME_ORGANIZATIONS}/${identifier}`}
                                >
                                  {translate(title) ?? name}
                                </Link>
                              </SC.ListItemValue>
                            )
                          )}
                          <SC.LightWeightLabel>
                            {translate(description)}
                          </SC.LightWeightLabel>
                        </>
                      }
                      value={role
                        .map(({ prefLabel }) => translate(prefLabel))
                        .filter(Boolean)
                        .join(', ')}
                    />
                  )
                )}
              </KeyValueList>
            </ContentSection>
          )}

          {keywords.length > 0 && (
            <ContentSection
              id='keywords'
              title={
                translations.detailsPage.sectionTitles.publicService.keywords
              }
            >
              <InlineList>
                {keywords.map((keyword, index) => (
                  <Link
                    as={RouterLink}
                    to={`${PATHNAME_PUBLIC_SERVICES}?keywords=${encodeURIComponent(
                      keyword
                    )}`}
                    key={`${keyword}-${index}`}
                  >
                    {keyword}
                  </Link>
                ))}
              </InlineList>
            </ContentSection>
          )}

          {isClassifiedBy.length > 0 && (
            <ContentSection
              id='concept-references'
              title={
                translations.detailsPage.sectionTitles.publicService
                  .conceptReferences
              }
              boxStyle
              entityIcon={Entity.CONCEPT}
            >
              <KeyValueList>
                {isClassifiedBy?.map(
                  ({ uri, prefLabel }) =>
                    uri && (
                      <KeyValueListItem
                        key={uri}
                        property={
                          conceptsMap[uri] ? (
                            <Link
                              as={RouterLink}
                              to={`${PATHNAME_CONCEPTS}/${conceptsMap[uri].id}`}
                            >
                              {translate(conceptsMap[uri].prefLabel)}
                            </Link>
                          ) : (
                            translate(prefLabel)
                          )
                        }
                        value={
                          conceptsMap[uri]
                            ? translate(conceptsMap[uri].definition?.text)
                            : ''
                        }
                      />
                    )
                )}
              </KeyValueList>
            </ContentSection>
          )}

          {(requiredServices.length > 0 ||
            relation.length > 0 ||
            publicServicesRequiredBy.length > 0 ||
            publicServicesRelatedBy.length > 0) && (
            <ContentSection
              id='relatedServices'
              title={
                translations.detailsPage.sectionTitles.publicService
                  .relatedServices
              }
              boxStyle
              entityIcon={Entity.PUBLIC_SERVICE}
            >
              <KeyValueList>
                {requiredServices.length > 0 && (
                  <KeyValueListItem
                    property={translations.requires}
                    value={requiredServices.map(({ uri, title }, index) =>
                      publicServicesMap?.[uri] ? (
                        <SC.ListItemValue key={`${uri}-${index}`}>
                          <Link
                            as={RouterLink}
                            to={`${PATHNAME_PUBLIC_SERVICES}/${publicServicesMap[uri]?.id}`}
                            key={`${uri}-${index}`}
                          >
                            {translate(title)}
                          </Link>
                        </SC.ListItemValue>
                      ) : (
                        translate(title)
                      )
                    )}
                  />
                )}
                {relation.length > 0 && (
                  <KeyValueListItem
                    property={
                      translations.detailsPage.sectionTitles.publicService
                        .relation
                    }
                    value={relation.map(({ uri, title }, index) =>
                      publicServicesMap?.[uri] ? (
                        <SC.ListItemValue key={`${uri}-${index}`}>
                          <Link
                            as={RouterLink}
                            to={`${PATHNAME_PUBLIC_SERVICES}/${publicServicesMap[uri]?.id}`}
                          >
                            {translate(title)}
                          </Link>
                        </SC.ListItemValue>
                      ) : (
                        translate(title)
                      )
                    )}
                  />
                )}
              </KeyValueList>
            </ContentSection>
          )}

          {datasetsUris.length > 0 && (
            <ContentSection
              id='isDescribedAt'
              title={
                translations.detailsPage.sectionTitles.publicService
                  .isDescribedAt
              }
              boxStyle
              entityIcon={Entity.DATASET}
            >
              <KeyValueList>
                {datasetsUris?.map(
                  uri =>
                    uri && (
                      <KeyValueListItem
                        key={uri}
                        property={
                          datasetsMap[uri] ? (
                            <Link
                              as={RouterLink}
                              to={`${PATHNAME_DATASETS}/${datasetsMap[uri].id}`}
                            >
                              {translate(datasetsMap[uri].title)}
                            </Link>
                          ) : (
                            translate(uri)
                          )
                        }
                        value={
                          datasetsMap[uri]
                            ? translate(datasetsMap[uri].description)
                            : ''
                        }
                      />
                    )
                )}
              </KeyValueList>
            </ContentSection>
          )}
          {contactPoints.length > 0 && (
            <ContentSection
              id='hasContactPoint'
              title={
                translations.detailsPage.sectionTitles.publicService
                  .contactPoint
              }
            >
              {contactPoints.map(
                ({
                  uri,
                  contactType,
                  description,
                  email,
                  name,
                  telephone,
                  url
                }) => (
                  <KeyValueList key={uri}>
                    {contactType && (
                      <KeyValueListItem
                        property=''
                        value={translate(contactType)}
                      />
                    )}
                    {description && (
                      <KeyValueListItem
                        property={translations.description}
                        value={translate(description)}
                      />
                    )}
                    {name && (
                      <KeyValueListItem
                        property={translations.name}
                        value={translate(name)}
                      />
                    )}
                    {email && (
                      <KeyValueListItem
                        property={translations.email}
                        value={
                          <a
                            title={email}
                            href={`mailto:${email}`}
                            rel='noopener noreferrer'
                          >
                            {email}
                          </a>
                        }
                      />
                    )}
                    {telephone && (
                      <KeyValueListItem
                        property={translations.phone}
                        value={telephone}
                      />
                    )}
                    {url && (
                      <KeyValueListItem
                        property={translations.contactPoint}
                        value={
                          <Link href={url} external>
                            {url}
                          </Link>
                        }
                      />
                    )}
                  </KeyValueList>
                )
              )}
            </ContentSection>
          )}
          {(eventsRelations.length > 0 ||
            publicServicesRelations.length > 0) && (
            <ContentSection
              id='relationList'
              title={translations.detailsPage.relationList.title.public_service}
            >
              <RelationList
                parentIdentifier={publicService.uri}
                events={eventsRelations}
                publicServices={publicServicesRelations}
              />
            </ContentSection>
          )}
        </DetailsPage>
      </ThemeProvider>
    )
  ) : (
    <ErrorPage errorCode='404' />
  );
};

export default compose(
  memo,
  withConcepts,
  withDatasets,
  withPublicService,
  withPublicServices,
  withEvents,
  withKartverket,
  withErrorBoundary(ErrorPage)
)(PublicServiceDetailsPage);
