import React, { FC, memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Link from '@fellesdatakatalog/link';
import moment from 'moment';
import { Link as ScrollLink } from 'react-scroll';

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
  CatalogTypeBox,
  ContentSection,
  InlineList,
  List,
  KeyValueList,
  KeyValueListItem
} from '../details-page';
import ErrorPage from '../error-page';
import RelationList, { ItemWithRelationType } from '../relation-list';

import type { TextLanguage, Theme } from '../../types';
import { Entity, Vocabulary } from '../../types/enums';

import {
  PATHNAME_CONCEPTS,
  PATHNAME_DATASETS,
  PATHNAME_EVENTS,
  PATHNAME_ORGANIZATIONS,
  PATHNAME_PUBLIC_SERVICES,
  PATHNAME_PUBLIC_SERVICES_AND_EVENTS
} from '../../constants/constants';
import SC from './styled';
import Markdown from '../markdown';

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
  events,
  concepts,
  datasets,
  publicService,
  publicServices,
  publicServicesRequiredBy,
  publicServicesRelatedBy,
  eventsRelations,
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
    resetPublicServicesRelatedBy
  },
  conceptsActions: { getConceptsRequested: getConcepts },
  datasetsActions: { getDatasetsRequested: getDatasets },
  eventsActions: {
    getEventsRequested: getEvents,
    resetEvents,
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

  const title = publicService?.title ?? {};
  const description = translate(publicService?.description);
  const lastPublished = formatDate(
    dateStringToDate(publicService?.harvest?.firstHarvested)
  );
  const languages = publicService?.language ?? [];
  const sectors = publicService?.sector ?? [];
  const hasCompetentAuthority = publicService?.hasCompetentAuthority ?? [];
  const keywords =
    publicService?.keyword?.map(kw => translate(kw))?.filter(Boolean) ?? [];
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
  const hasParticipation = publicService?.hasParticipation ?? [];
  const hasInput = publicService?.hasInput ?? [];
  const hasChannel = publicService?.hasChannel ?? [];
  const hasCost = publicService?.hasCost ?? [];
  const processingTime = publicService?.processingTime;
  const relation = publicService?.relation || [];
  const contactPoints = publicService?.contactPoint || [];
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
    (previous, current) => ({ ...previous, [current.identifier]: current }),
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
    if (isGroupedBy.length > 0) {
      getEvents({ uris: isGroupedBy });
    }
    return () => {
      resetEvents();
    };
  }, [isGroupedBy.join()]);

  useEffect(() => {
    if (publicService?.uri) {
      getEventsRelations({ relation: publicService.uri });
    }
    if (spatial.length > 0) {
      listAdministrativeUnits(spatial);
    }
    return () => {
      resetEventsRelations();
      resetAdministrativeUnits();
    };
  }, [publicService?.uri]);

  const administrativeUnitsMap = administrativeUnits?.reduce(
    (previous, current) => ({ ...previous, [current.uri]: current }),
    {} as Record<string, any>
  );

  const eventsRelationsWithRelationType: ItemWithRelationType[] =
    eventsRelations.map(eventRelation => ({
      relation: eventRelation,
      relationType: translations.relatedBy
    }));

  const publicServicesRequiredByWithRelationType: ItemWithRelationType[] =
    publicServicesRequiredBy.map(publicServiceRelation => ({
      relation: publicServiceRelation,
      relationType: translations.requiredBy
    }));

  const publicServicesRelatedByWithRelationType: ItemWithRelationType[] =
    publicServicesRelatedBy.map(publicServiceRelation => ({
      relation: publicServiceRelation,
      relationType: translations.relatedBy
    }));

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
          admsStatus={admsStatus}
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
              <Markdown>{description}</Markdown>
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
                ))}
                {relation?.map(({ uri }, index) => (
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
                {isGroupedBy?.map(uri =>
                  eventsMap[uri] ? (
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
                  ({ uri, prefLabel }) =>
                    uri && (
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
                    )
                )}
              </List>
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
                  (
                    {
                      description: hasParticipationDescription,
                      role,
                      agents = []
                    },
                    index
                  ) =>
                    hasParticipationDescription && (
                      <KeyValueListItem
                        key={`${translate(
                          hasParticipationDescription
                        )}-${index}`}
                        property={
                          <>
                            {agents.map(
                              (
                                { uri, identifier, name, title: agentTitle },
                                agentIndex
                              ) => (
                                <SC.ListItemValue key={`${uri}-${agentIndex}`}>
                                  <Link
                                    as={RouterLink}
                                    to={`${PATHNAME_ORGANIZATIONS}/${identifier}`}
                                  >
                                    {translate(agentTitle) ?? name}
                                  </Link>
                                </SC.ListItemValue>
                              )
                            )}
                            <SC.LightWeightLabel>
                              {translate(hasParticipationDescription)}
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
                    to={`${PATHNAME_PUBLIC_SERVICES_AND_EVENTS}?keywords=${encodeURIComponent(
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
                  uri =>
                    uri && (
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
                    )
                )}
              </List>
            </ContentSection>
          )}
          {(eventsRelations.length > 0 ||
            publicServicesRequiredBy.length > 0 ||
            publicServicesRelatedBy.length > 0) && (
            <ContentSection
              id='relationList'
              title={translations.detailsPage.relationList.title.public_service}
            >
              <RelationList
                parentIdentifier={publicService.uri}
                events={eventsRelationsWithRelationType}
                publicServices={[
                  ...publicServicesRequiredByWithRelationType,
                  ...publicServicesRelatedByWithRelationType
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
  withErrorBoundary(ErrorPage)
)(PublicServiceDetailsPage);
