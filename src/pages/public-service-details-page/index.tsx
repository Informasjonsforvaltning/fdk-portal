import React, { FC, memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Link from '@fellesdatakatalog/link';
import moment from 'moment';
import { Link as ScrollLink } from 'react-scroll';

import translations from '../../lib/localization';
import {
  getTranslateTextWithLanguageCode,
  getTranslateText as translate
} from '../../lib/translateText';
import { dateStringToDate, formatDate } from '../../lib/date-utils';

import { themeFDK } from '../../app/theme';

import withPublicService, {
  Props as PublicServiceProps
} from '../../components/with-public-service';
import withPublicServices, {
  Props as PublicServicesProps
} from '../../components/with-public-services';
import withConcepts, {
  Props as ConceptsProps
} from '../../components/with-concepts';
import withDatasets, {
  Props as DatasetsProps
} from '../../components/with-datasets';
import withEvents, { Props as EventsProps } from '../../components/with-events';
import withKartverket, {
  Props as KartverketProps
} from '../../components/with-kartverket';
import withErrorBoundary from '../../components/with-error-boundary';

import {
  DetailsPage,
  CatalogTypeBox,
  ContentSection,
  InlineList,
  List,
  KeyValueList,
  KeyValueListItem
} from '../../components/details-page';
import ErrorPage from '../error-page';
import RelationList from '../../components/relation-list';

import type { TextLanguage } from '../../types';
import { Entity, Vocabulary } from '../../types/enums';

import {
  PATHNAME_CONCEPTS,
  PATHNAME_DATASETS,
  PATHNAME_EVENTS,
  PATHNAME_PUBLIC_SERVICES,
  PATHNAME_PUBLIC_SERVICES_AND_EVENTS
} from '../../constants/constants';
import SC from './styled';
import Markdown from '../../components/markdown';
import withResourceRelations, {
  ResourceRelationsProps
} from '../../components/with-resource-relations';
import { filterRelations } from '../../utils/common';
import localization from '../../lib/localization';

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
    ResourceRelationsProps,
    RouteComponentProps<RouteParams> {}

const PublicServiceDetailsPage: FC<Props> = ({
  isLoadingPublicService,
  events,
  concepts,
  datasets,
  publicService,
  publicServices,
  relations,
  publicServiceActions: {
    getPublicServiceRequested: getPublicService,
    resetPublicService
  },
  publicServicesActions: {
    getPublicServicesRequested: getPublicServices,
    resetPublicServices
  },
  conceptsActions: { getConceptsRequested: getConcepts },
  datasetsActions: { getDatasetsRequested: getDatasets },
  eventsActions: { getEventsRequested: getEvents, resetEvents },
  resourceRelationsActions: {
    getResourceRelationsRequested: getRelations,
    resetResourceRelations
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
    };
  }, [publicServiceId]);
  const title = publicService?.title ?? {};
  const description = translate(publicService?.description);
  const serviceTypeCodes = publicService?.dctType ?? [];
  const lastPublished = formatDate(
    dateStringToDate(publicService?.harvest?.firstHarvested)
  );
  const languages = publicService?.language ?? [];
  const sectors = publicService?.sector ?? [];
  const hasCompetentAuthority = publicService?.hasCompetentAuthority ?? [];
  const ownedBy = publicService?.ownedBy ?? [];
  const keywords =
    (publicService?.keyword
      ?.map(keyword =>
        getTranslateTextWithLanguageCode(keyword, translations.getLanguage())
      )
      ?.filter(Boolean) as string[]) ?? [];
  const requiredServices = publicService?.requires || [];
  const admsStatus = publicService?.admsStatus;
  const subject = publicService?.subject || [];
  const serviceHomepages = publicService?.homepage || [];
  const isGroupedBy = publicService?.isGroupedBy || [];
  const produces = publicService?.produces ?? [];
  const hasCriterion = publicService?.hasCriterion ?? [];
  const holdsRequirement = publicService?.holdsRequirement ?? [];
  const follows = publicService?.follows ?? [];
  const hasLegalResource = publicService?.hasLegalResource ?? [];
  const hasInput = publicService?.hasInput ?? [];
  const hasChannel = publicService?.hasChannel ?? [];
  const hasCost = publicService?.hasCost ?? [];
  const processingTime = publicService?.processingTime;
  const relation = publicService?.relation || [];
  const contactPoints = publicService?.contactPoint ?? [];
  const participatingAgents = publicService?.participatingAgents || [];
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

  const conceptsIdentifiers = (
    subject.map(({ uri }) => uri) as string[]
  ).filter(Boolean);

  const conceptsMap = concepts?.reduce(
    (previous, current) => ({ ...previous, [current.uri]: current }),
    {} as Record<string, any>
  );

  const datasetsMap = datasets?.reduce(
    (previous, current) => ({ ...previous, [current.uri]: current }),
    {} as Record<string, any>
  );

  const eventsMap = events?.reduce(
    (previous, current) => ({ ...previous, [current.uri]: current }),
    {} as Record<string, any>
  );

  useEffect(() => {
    if (publicServiceIdentifiers.length > 0) {
      getPublicServices({
        uri: publicServiceIdentifiers,
        size: publicServiceIdentifiers.length
      });
    }
  }, [publicServiceIdentifiers.join()]);

  useEffect(() => {
    if (conceptsIdentifiers.length > 0) {
      getConcepts({
        uri: conceptsIdentifiers,
        size: conceptsIdentifiers.length
      });
    }
  }, [conceptsIdentifiers.join()]);

  useEffect(() => {
    if (datasetsUris.length > 0) {
      getDatasets({ uri: datasetsUris, size: datasetsUris.length });
    }
  }, [datasetsUris.join()]);

  useEffect(() => {
    if (isGroupedBy.length > 0) {
      getEvents({ uri: isGroupedBy, size: isGroupedBy.length });
    }
    return () => {
      resetEvents();
    };
  }, [isGroupedBy.join()]);

  useEffect(() => {
    if (publicService?.uri) {
      getRelations({ relations: publicService.uri });
    }
    if (spatial.length > 0) {
      listAdministrativeUnits(spatial);
    }
    return () => {
      resetResourceRelations();
      resetAdministrativeUnits();
    };
  }, [publicService?.uri]);

  const administrativeUnitsMap = administrativeUnits?.reduce(
    (previous, current) => ({ ...previous, [current.uri]: current }),
    {} as Record<string, any>
  );

  const eventRelations = filterRelations(relations, Entity.EVENT);

  const publicServicesRequiredBy = filterRelations(
    relations,
    Entity.PUBLIC_SERVICE,
    'requires',
    publicService?.uri
  );

  const publicServicesRelatedBy = filterRelations(
    relations,
    Entity.PUBLIC_SERVICE,
    'relation',
    publicService?.uri
  );

  const getLink = (
    uri: string,
    resources: {
      uri: string;
      dctTitle?: Partial<TextLanguage>;
      name?: Partial<TextLanguage>;
    }[]
  ) => {
    const match = resources.find(
      (resource: { uri: string }) => resource.uri === uri
    );

    if (match) {
      const index = resources.indexOf(match);
      return (
        <ScrollLink to={`${uri}-${index}`} smooth isDynamic spy>
          {match.dctTitle || match.name
            ? translate(match.dctTitle ?? match.name)
            : uri}
        </ScrollLink>
      );
    }

    return (
      <Link key={uri} href={uri} external>
        {uri}
      </Link>
    );
  };

  return renderPage ? (
    publicService && (
      <ThemeProvider theme={theme}>
        <DetailsPage
          entity={entity}
          title={title}
          publisher={hasCompetentAuthority[0] || ownedBy[0]}
          entityId={publicService?.id}
          entityUri={publicService?.uri}
          lastPublished={lastPublished}
          isAuthoritative={false}
          isOpenData={false}
          isPublicData={false}
          isRestrictedData={false}
          isNonPublicData={false}
        >
          {description && (
            <ContentSection
              id='description'
              title={
                translations.detailsPage.sectionTitles.publicService.description
              }
              truncate
            >
              <Markdown>{description}</Markdown>
            </ContentSection>
          )}
          {serviceTypeCodes.length > 0 && (
            <ContentSection
              id='serviceType'
              title={
                publicService.specializedType === 'publicService'
                  ? translations.detailsPage.sectionTitles.publicService
                      .mainActivity
                  : translations.detailsPage.sectionTitles.publicService
                      .serviceType
              }
              truncate
            >
              {serviceTypeCodes.map(code =>
                code.prefLabel ? translate(code.prefLabel) : code.uri
              )}
            </ContentSection>
          )}
          {produces.length > 0 && (
            <ContentSection
              id='produces'
              title={
                translations.detailsPage.sectionTitles.publicService.produces
              }
            >
              {produces.map(
                (
                  {
                    name,
                    language: availableLanguages,
                    description: producesDescription
                  },
                  index
                ) => (
                  <>
                    <SC.KeyValueListHeader>
                      {translate(name)}
                    </SC.KeyValueListHeader>
                    <KeyValueList>
                      {producesDescription && (
                        <KeyValueListItem
                          key={`producesDescription-${index}`}
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .description
                          }
                          value={translate(producesDescription)}
                        />
                      )}

                      {availableLanguages && (
                        <KeyValueListItem
                          key={`producesDescriptionLanguage-${index}`}
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .availableLanguages
                          }
                          value={availableLanguages
                            .map(({ prefLabel }) => translate(prefLabel))
                            .join(', ')}
                        />
                      )}
                    </KeyValueList>
                  </>
                )
              )}
            </ContentSection>
          )}
          {(requiredServices.length > 0 || relation.length > 0) && (
            <ContentSection
              id='relatedServices'
              title={
                translations.detailsPage.sectionTitles.publicService
                  .relatedServices
              }
            >
              <List>
                {requiredServices?.map(({ uri }, index) => (
                  <li key={`${uri}-${index}`}>
                    <CatalogTypeBox entity={Entity.PUBLIC_SERVICE}>
                      <span>
                        {translations.requires}&nbsp;
                        {publicServicesMap?.[uri] ? (
                          <Link
                            as={RouterLink}
                            to={`${PATHNAME_PUBLIC_SERVICES}/${publicServicesMap[uri].id}`}
                            key={`${uri}-${index}`}
                          >
                            {translate(publicServicesMap[uri].title) ?? uri}
                          </Link>
                        ) : (
                          uri
                        )}
                      </span>
                    </CatalogTypeBox>
                  </li>
                ))}
                {relation?.map(({ uri }, index) => (
                  <li key={`${uri}-${index}`}>
                    <CatalogTypeBox entity={Entity.PUBLIC_SERVICE}>
                      <span>
                        {translations.isRelatedTo}&nbsp;
                        {publicServicesMap?.[uri] ? (
                          <Link
                            as={RouterLink}
                            to={`${PATHNAME_PUBLIC_SERVICES}/${publicServicesMap[uri].id}`}
                            key={`${uri}-${index}`}
                          >
                            {translate(publicServicesMap[uri].title) ?? uri}
                          </Link>
                        ) : (
                          uri
                        )}
                      </span>
                    </CatalogTypeBox>
                  </li>
                ))}
              </List>
            </ContentSection>
          )}
          {isGroupedBy.length > 0 && (
            <ContentSection
              id='related-events'
              title={
                translations.detailsPage.sectionTitles.publicService
                  .relatedEvents
              }
            >
              <List>
                {isGroupedBy?.map((uri, index) =>
                  eventsMap[uri] ? (
                    <li key={`${uri}-${index}`}>
                      <CatalogTypeBox key={uri} entity={Entity.EVENT}>
                        <span>
                          {translations.isGroupedBy}&nbsp;
                          {eventsMap[uri].id ? (
                            <Link
                              as={RouterLink}
                              to={`${PATHNAME_EVENTS}/${eventsMap[uri].id}`}
                            >
                              {translate(eventsMap[uri].title ?? uri)}
                            </Link>
                          ) : (
                            uri
                          )}
                        </span>
                      </CatalogTypeBox>
                    </li>
                  ) : null
                )}
              </List>
            </ContentSection>
          )}
          {subject.length > 0 && (
            <ContentSection
              id='concept-references'
              title={
                translations.detailsPage.sectionTitles.publicService
                  .conceptReferences
              }
            >
              <List>
                {subject?.map(
                  ({ uri, prefLabel }, index) =>
                    uri && (
                      <li key={`${uri}-${index}`}>
                        <CatalogTypeBox entity={Entity.CONCEPT}>
                          {conceptsMap[uri] ? (
                            <Link
                              as={RouterLink}
                              to={`${PATHNAME_CONCEPTS}/${conceptsMap[uri].id}`}
                            >
                              {translate(conceptsMap[uri].prefLabel)}
                            </Link>
                          ) : (
                            translate(prefLabel)
                          )}
                          <div>
                            {conceptsMap[uri]
                              ? translate(conceptsMap[uri].definition?.text)
                              : uri}
                          </div>
                        </CatalogTypeBox>
                      </li>
                    )
                )}
              </List>
            </ContentSection>
          )}
          {participatingAgents.length > 0 && (
            <ContentSection
              id='participatingAgents'
              title={
                translations.detailsPage.sectionTitles.publicService
                  .participation
              }
            >
              {participatingAgents.map(
                (
                  {
                    title: agentTitle,
                    orgType,
                    spatial: agentSpatial,
                    homepage: agentHomepage,
                    playsRole,
                    name: orgName
                  },
                  index
                ) => (
                  <div>
                    {agentTitle && (
                      <SC.KeyValueListHeader>
                        {translate(agentTitle)}
                      </SC.KeyValueListHeader>
                    )}

                    {orgType?.prefLabel && (
                      <SC.KeyValueListSubHeader>
                        {translate(orgType.prefLabel)}
                      </SC.KeyValueListSubHeader>
                    )}

                    <KeyValueList>
                      {orgName && (
                        <KeyValueListItem
                          property={translations.name}
                          value={translate(orgName)}
                        />
                      )}
                      {agentSpatial && (
                        <KeyValueListItem
                          key={`agentSpatial-${index}`}
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .spatialCoverage
                          }
                          value={agentSpatial.map(uri =>
                            administrativeUnitsMap[uri] ? (
                              <Link key={uri} href={uri} external>
                                {translate(administrativeUnitsMap[uri]?.name) ||
                                  uri}
                              </Link>
                            ) : (
                              `${uri} `
                            )
                          )}
                        />
                      )}

                      {agentHomepage && (
                        <KeyValueListItem
                          key={`agentHomepage-${index}`}
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .homepage
                          }
                          value={agentHomepage
                            .map(uri => (
                              <Link key={uri} href={uri} external>
                                {uri}
                              </Link>
                            ))
                            .filter(Boolean)}
                        />
                      )}

                      {playsRole &&
                        playsRole.map(value => (
                          <KeyValueListItem
                            property={value.role
                              .map(role => translate(role.prefLabel))
                              .filter(Boolean)
                              .join(', ')}
                            value={translate(value.description)}
                          />
                        ))}
                    </KeyValueList>
                  </div>
                )
              )}
            </ContentSection>
          )}
          {holdsRequirement.length > 0 && (
            <ContentSection
              id='holdsRequirement'
              title={
                translations.detailsPage.sectionTitles.publicService.requirement
              }
            >
              {holdsRequirement.map(
                (
                  { dctTitle, description: requirementDescription, fulfils },
                  index
                ) => (
                  <div>
                    {dctTitle && (
                      <SC.KeyValueListHeader>
                        {translate(dctTitle)}
                      </SC.KeyValueListHeader>
                    )}
                    <KeyValueList>
                      {requirementDescription && (
                        <KeyValueListItem
                          key={`requirementDescription-${index}`}
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .description
                          }
                          value={translate(requirementDescription)}
                        />
                      )}
                      <KeyValueListItem
                        key={`requirementFulfils-${index}`}
                        property={
                          translations.detailsPage.sectionTitles.publicService
                            .satisfiesRule
                        }
                        value={fulfils.map(fulfilsUri =>
                          getLink(fulfilsUri, follows)
                        )}
                      />
                    </KeyValueList>
                  </div>
                )
              )}
            </ContentSection>
          )}
          {follows.length > 0 && (
            <ContentSection
              id='follows'
              title={translations.detailsPage.sectionTitles.publicService.rule}
            >
              {follows.map(
                (
                  {
                    name,
                    description: followsDescription,
                    language: availableLanguages,
                    implements: followsImplements,
                    uri: followsUri
                  },
                  index
                ) => (
                  <div id={`${followsUri}-${index}`}>
                    {name ? (
                      <SC.KeyValueListHeader>
                        {translate(name)}
                      </SC.KeyValueListHeader>
                    ) : (
                      <Link href={followsUri} external>
                        {followsUri}
                      </Link>
                    )}
                    <KeyValueList>
                      {followsDescription && (
                        <KeyValueListItem
                          key={`followsDescription-${index}`}
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .description
                          }
                          value={translate(followsDescription)}
                        />
                      )}

                      {availableLanguages && (
                        <KeyValueListItem
                          key={`followsLanguages-${index}`}
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .availableLanguages
                          }
                          value={availableLanguages
                            .map(({ prefLabel, uri }) =>
                              prefLabel ? translate(prefLabel) : uri
                            )
                            .filter(Boolean)
                            .join(', ')}
                        />
                      )}
                      {followsImplements && (
                        <KeyValueListItem
                          key={`followsImplements-${index}`}
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .hasBackgroundIn
                          }
                          value={followsImplements.map(implementsUri =>
                            getLink(implementsUri, hasLegalResource)
                          )}
                        />
                      )}
                    </KeyValueList>
                  </div>
                )
              )}
            </ContentSection>
          )}
          {hasLegalResource.length > 0 && (
            <ContentSection
              id='hasLegalResource'
              title={
                translations.detailsPage.sectionTitles.publicService
                  .relatedLegalResources
              }
            >
              {hasLegalResource.map(
                (
                  {
                    description: legalResourceDescription,
                    dctTitle,
                    seeAlso,
                    relation: legalResourceRelations,
                    uri
                  },
                  index
                ) => (
                  <div id={`${uri}-${index}`}>
                    {dctTitle && (
                      <SC.KeyValueListHeader>
                        {translate(dctTitle)}
                      </SC.KeyValueListHeader>
                    )}

                    <KeyValueList>
                      {legalResourceDescription && (
                        <KeyValueListItem
                          key={`legalResourceDescription-${index}`}
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .description
                          }
                          value={translate(legalResourceDescription)}
                        />
                      )}

                      {seeAlso && (
                        <KeyValueListItem
                          key={`legalResourceReference-${index}`}
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .references
                          }
                          value={seeAlso.map(url => (
                            <Link key={url} href={url} external>
                              {url}
                            </Link>
                          ))}
                        />
                      )}
                      {legalResourceRelations && (
                        <KeyValueListItem
                          key={`legalResourceRelatedResources-${index}`}
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .relatedResources
                          }
                          value={legalResourceRelations.map(legalResourceUri =>
                            getLink(legalResourceUri, hasLegalResource)
                          )}
                        />
                      )}
                    </KeyValueList>
                  </div>
                )
              )}
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
                      .map(({ prefLabel, uri }) =>
                        prefLabel ? translate(prefLabel) : uri
                      )
                      .filter(Boolean)
                      .join(', ')}
                  />
                ))}
              </KeyValueList>
            </ContentSection>
          )}
          {hasInput.length > 0 && (
            <ContentSection
              id='hasInput'
              title={
                translations.detailsPage.sectionTitles.publicService
                  .documentation
              }
            >
              {hasInput.map(
                (
                  {
                    name,
                    description: hasInputDescription,
                    dctType,
                    language: acceptedLanguages,
                    page,
                    rdfType,
                    uri: hasInputUri
                  },
                  index
                ) =>
                  rdfType === Vocabulary.DATASET ? (
                    (name || hasInputDescription) && (
                      <CatalogTypeBox entity={Entity.DATASET}>
                        <h3>{translate(name)}</h3>
                        <p>{translate(hasInputDescription)}</p>
                      </CatalogTypeBox>
                    )
                  ) : (
                    <div id={`${hasInputUri}-${index}`}>
                      {name && (
                        <SC.KeyValueListHeader>
                          {translate(name)}
                        </SC.KeyValueListHeader>
                      )}
                      {dctType && (
                        <SC.KeyValueListSubHeader>
                          {dctType
                            .map(({ prefLabel, uri }) =>
                              prefLabel ? translate(prefLabel) : uri
                            )
                            .filter(Boolean)
                            .join(', ')}
                        </SC.KeyValueListSubHeader>
                      )}
                      <KeyValueList>
                        {hasInputDescription && (
                          <KeyValueListItem
                            key={`description-${index}`}
                            property={
                              translations.detailsPage.sectionTitles
                                .publicService.description
                            }
                            value={translate(hasInputDescription)}
                          />
                        )}

                        {acceptedLanguages && (
                          <KeyValueListItem
                            key={`acceptedLanguages-${index}`}
                            property={
                              translations.detailsPage.sectionTitles
                                .publicService.acceptedLanguages
                            }
                            value={acceptedLanguages
                              .map(({ prefLabel, uri: languageUri }) =>
                                prefLabel ? translate(prefLabel) : languageUri
                              )
                              .filter(Boolean)
                              .join(', ')}
                          />
                        )}
                        {page && (
                          <KeyValueListItem
                            key={`relatedInformation-${index}`}
                            property={
                              translations.detailsPage.sectionTitles
                                .publicService.relatedInformation
                            }
                            value={page?.map(pageUri => (
                              <Link key={pageUri} href={pageUri} external>
                                {pageUri}
                              </Link>
                            ))}
                          />
                        )}
                      </KeyValueList>
                    </div>
                  )
              )}
            </ContentSection>
          )}
          {hasChannel.length > 0 && (
            <ContentSection
              id='channels'
              title={
                translations.detailsPage.sectionTitles.publicService
                  .serviceChannel
              }
            >
              {hasChannel.map(
                (
                  {
                    channelType,
                    description: hasChannelDescription,
                    telephone,
                    address,
                    processingTime: hasChannelProcessingTime,
                    hasInput: documentation,
                    email,
                    url: hasChannelUrl
                  },
                  index
                ) => (
                  <div>
                    {channelType && (
                      <SC.KeyValueListHeader>
                        {translate(channelType.prefLabel)}
                      </SC.KeyValueListHeader>
                    )}
                    <KeyValueList>
                      {hasChannelDescription && (
                        <KeyValueListItem
                          key={`channelDescription-${index}`}
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .description
                          }
                          value={translate(hasChannelDescription)}
                        />
                      )}

                      {telephone && (
                        <KeyValueListItem
                          property={translations.phone}
                          value={telephone
                            .map(numb => numb.split('tel:').filter(Boolean))
                            .join(', ')}
                        />
                      )}

                      {address && (
                        <KeyValueListItem
                          key={`channelAddress-${index}`}
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .address
                          }
                          value={address
                            .map(
                              value =>
                                `${value.streetAddress}, ${value.postalCode} ${value.locality}`
                            )
                            .filter(Boolean)
                            .join(', ')}
                        />
                      )}
                      {email && (
                        <KeyValueListItem
                          key={`channelEmail-${index}`}
                          property={translations.email}
                          value={email.map(value => (
                            <a
                              href={`mailto:${value.split('mailto:')}`}
                              rel='noopener noreferrer'
                            >
                              {value
                                .split('mailto:')
                                .filter(Boolean)
                                .join(', ')}
                            </a>
                          ))}
                        />
                      )}
                      {hasChannelUrl && (
                        <KeyValueListItem
                          key={`channelUrl-${index}`}
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .webAddress
                          }
                          value={hasChannelUrl.map(url => (
                            <Link key={url} href={url} external>
                              {url}
                            </Link>
                          ))}
                        />
                      )}
                      {hasChannelProcessingTime && (
                        <KeyValueListItem
                          key={`channelprocessingTime-${index}`}
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .processingTime
                          }
                          value={`${moment
                            .duration(hasChannelProcessingTime)
                            .asDays()} ${translations.days}`}
                        />
                      )}
                      {documentation && (
                        <KeyValueListItem
                          key={`channelHasInput-${index}`}
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .documentation
                          }
                          value={documentation.map(uri =>
                            getLink(uri, hasInput)
                          )}
                        />
                      )}
                    </KeyValueList>
                  </div>
                )
              )}
            </ContentSection>
          )}
          {(languages.length > 0 ||
            sectors.length > 0 ||
            hasChannel.length > 0 ||
            processingTime ||
            hasCompetentAuthority.length > 0) && (
            <ContentSection
              id='usage'
              title={translations.detailsPage.sectionTitles.publicService.usage}
            >
              <KeyValueList>
                {hasCompetentAuthority.length > 0 &&
                  hasCompetentAuthority.map(
                    ({ uri: authorityUri, title: authorityTitle, orgType }) =>
                      (authorityTitle ||
                        authorityUri ||
                        orgType?.prefLabel) && (
                        <KeyValueListItem
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .competentAuthority
                          }
                          value={
                            <div>
                              {authorityUri ? (
                                <Link href={authorityUri}>
                                  {authorityTitle
                                    ? translate(authorityTitle)
                                    : authorityUri}
                                </Link>
                              ) : (
                                translate(authorityTitle)
                              )}
                              {orgType?.prefLabel &&
                              (authorityTitle || authorityUri)
                                ? `, ${translate(orgType.prefLabel)}`
                                : translate(orgType?.prefLabel)}
                            </div>
                          }
                        />
                      )
                  )}

                {hasChannel.length > 0 && (
                  <KeyValueListItem
                    property={
                      translations.detailsPage.sectionTitles.publicService
                        .channel
                    }
                    value={hasChannel
                      .map(({ channelType }) =>
                        translate(channelType?.prefLabel)
                      )
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
                      .sort(
                        (
                          { ifAccessedThrough: { uri: aUri } },
                          { ifAccessedThrough: { uri: bUri } }
                        ) => (aUri > bUri ? 1 : -1)
                      )
                      .map(
                        (
                          {
                            uri,
                            currency = '',
                            description: costDescription,
                            ifAccessedThrough,
                            value = ''
                          },
                          index: number
                        ) => {
                          let costChannelLabel;
                          const previousCostChannelUri =
                            hasCost[index - 1]?.ifAccessedThrough.uri;
                          const currentCostChannelUri = ifAccessedThrough?.uri;
                          if (
                            index === 0 ||
                            (index > 0 &&
                              previousCostChannelUri &&
                              currentCostChannelUri &&
                              previousCostChannelUri !== currentCostChannelUri)
                          ) {
                            costChannelLabel = translate(
                              ifAccessedThrough?.channelType?.prefLabel
                            );
                          }
                          return (
                            <SC.ListItemValue key={uri}>
                              <SC.ListItemValueHeader>
                                {costChannelLabel}
                              </SC.ListItemValueHeader>
                              {translate(costDescription)}
                              {translate(costDescription) && value && ': '}
                              {value}{' '}
                              {currency.substring(
                                currency.lastIndexOf('/') + 1
                              )}
                            </SC.ListItemValue>
                          );
                        }
                      )
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
                      .map(({ uri, description: followsDescription }) => (
                        <SC.ListItemValue key={uri}>
                          {translate(followsDescription)}
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
                {spatial.length > 0 && (
                  <KeyValueListItem
                    property={
                      translations.detailsPage.sectionTitles.publicService
                        .spatial
                    }
                    value={spatial
                      .map(uri =>
                        administrativeUnitsMap[uri] ? (
                          <Link key={uri} href={uri} external>
                            {translate(administrativeUnitsMap[uri]?.name) ||
                              uri}
                          </Link>
                        ) : (
                          uri
                        )
                      )
                      .filter(Boolean)}
                  />
                )}
                {admsStatus?.prefLabel && (
                  <KeyValueListItem
                    property={
                      localization.detailsPage.sectionTitles.publicService
                        .status
                    }
                    value={translate(admsStatus.prefLabel)}
                  />
                )}
              </KeyValueList>
            </ContentSection>
          )}
          {serviceHomepages.length > 0 && (
            <ContentSection
              id='serviceHomepages'
              title={
                translations.detailsPage.sectionTitles.publicService
                  .serviceHomepage
              }
            >
              {serviceHomepages.map(uri => (
                <ul>
                  <Link key={uri} href={uri} external>
                    {uri}
                  </Link>
                </ul>
              ))}
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
                    to={`${PATHNAME_PUBLIC_SERVICES_AND_EVENTS}?q=${encodeURIComponent(
                      keyword ?? ''
                    )}`}
                    key={`${keyword}-${index}`}
                  >
                    {keyword}
                  </Link>
                ))}
              </InlineList>
            </ContentSection>
          )}
          {datasetsUris.length > 0 && (
            <ContentSection
              id='isDescribedAt'
              title={
                translations.detailsPage.sectionTitles.publicService
                  .isDescribedAt
              }
            >
              <List>
                {datasetsUris?.map(
                  (uri, index) =>
                    uri && (
                      <li key={`${uri}-${index}`}>
                        <CatalogTypeBox entity={Entity.DATASET}>
                          {datasetsMap[uri] ? (
                            <Link
                              as={RouterLink}
                              to={`${PATHNAME_DATASETS}/${datasetsMap[uri].id}`}
                            >
                              {translate(datasetsMap[uri].title)}
                            </Link>
                          ) : (
                            translate(uri)
                          )}
                        </CatalogTypeBox>
                      </li>
                    )
                )}
              </List>
            </ContentSection>
          )}
          {(eventRelations.length > 0 ||
            publicServicesRequiredBy.length > 0 ||
            publicServicesRelatedBy.length > 0) && (
            <ContentSection
              id='relationList'
              title={translations.detailsPage.relationList.title.public_service}
            >
              <RelationList
                parentIdentifier={publicService.uri}
                events={eventRelations}
                publicServices={[
                  ...publicServicesRelatedBy,
                  ...publicServicesRequiredBy
                ]}
              />
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
                  contactType,
                  uri,
                  contactPage,
                  language,
                  email,
                  openingHours,
                  telephone
                }) => (
                  <>
                    {contactType && (
                      <SC.KeyValueListHeader>
                        {translate(contactType)}
                      </SC.KeyValueListHeader>
                    )}

                    <KeyValueList key={uri}>
                      {email && (
                        <KeyValueListItem
                          property={translations.email}
                          value={
                            <a
                              href={`mailto:${email}`}
                              rel='noopener noreferrer'
                            >
                              {email.join(', ')}
                            </a>
                          }
                        />
                      )}
                      {telephone && (
                        <KeyValueListItem
                          property={translations.phone}
                          value={telephone
                            .map(number => number.split('tel:').filter(Boolean))
                            .join(', ')}
                        />
                      )}

                      {contactPage && (
                        <KeyValueListItem
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .contactPage
                          }
                          value={
                            <Link href={contactPage} external>
                              {contactPage}
                            </Link>
                          }
                        />
                      )}
                      {openingHours && (
                        <KeyValueListItem
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .openingHours
                          }
                          value={translate(openingHours)}
                        />
                      )}
                      {language && (
                        <KeyValueListItem
                          property={
                            translations.detailsPage.sectionTitles.publicService
                              .acceptedLanguages
                          }
                          value={language
                            .map(({ prefLabel }) => translate(prefLabel))
                            .join(', ')}
                        />
                      )}
                    </KeyValueList>
                  </>
                )
              )}
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
  withResourceRelations,
  withErrorBoundary(ErrorPage)
)(PublicServiceDetailsPage);
