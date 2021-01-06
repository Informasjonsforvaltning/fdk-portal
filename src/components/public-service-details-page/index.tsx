import React, { memo, FC, useEffect, useState } from 'react';
import { compose } from 'redux';
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Link from '@fellesdatakatalog/link';

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

import DetailsPage, {
  ContentSection,
  InlineList,
  KeyValueList,
  KeyValueListItem
} from '../details-page';

import type { Theme } from '../../types';
import { Entity } from '../../types/enums';

import {
  PATHNAME_CONCEPTS,
  PATHNAME_PUBLIC_SERVICES
} from '../../constants/constants';
import { PublicService } from '../../types';
import SC from './styled';

interface RouteParams {
  publicServiceId: string;
}

interface Props
  extends ConceptsProps,
    PublicServiceProps,
    PublicServicesProps,
    RouteComponentProps<RouteParams> {}

const PublicServiceDetailsPage: FC<Props> = ({
  publicService,
  publicServiceActions: {
    getPublicServiceRequested: getPublicService,
    resetPublicService
  },
  publicServices,
  publicServicesActions: {
    getPublicServicesRequested: getPublicServices,
    resetPublicServices
  },
  concepts,
  conceptsActions: { getConceptsRequested: getConcepts },
  match: {
    params: { publicServiceId }
  }
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const entity = Entity.PUBLIC_SERVICE;
  const theme = { entityColours: themeFDK.extendedColors[entity] };

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

  const publicServiceIdentifiers = (requiredServices.map(
    ({ uri }) => uri
  ) as string[]).filter(Boolean);

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

  const themes: Theme[] = [];

  return isMounted
    ? publicService && (
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
                id="description"
                title={
                  translations.detailsPage.sectionTitles.publicService
                    .description
                }
              >
                {description}
              </ContentSection>
            )}
            {(languages.length > 0 || sectors.length > 0) && (
              <ContentSection
                id="usage"
                title={
                  translations.detailsPage.sectionTitles.publicService.usage
                }
              >
                <KeyValueList>
                  {languages.length > 0 && (
                    <KeyValueListItem
                      property={translations.language}
                      value={languages
                        .map(({ prefLabel }) => translate(prefLabel))
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
                </KeyValueList>
              </ContentSection>
            )}
            {keywords.length > 0 && (
              <ContentSection
                id="keywords"
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

            {hasCriterion.length > 0 && (
              <ContentSection
                id="hasCriterion"
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
                id="produces"
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

            {follows.length > 0 && (
              <ContentSection
                id="follows"
                title={
                  translations.detailsPage.sectionTitles.publicService.follows
                }
              >
                <KeyValueList>
                  {follows.map(({ name, description }, index) => (
                    <KeyValueListItem
                      key={`${translate(name)}-${index}`}
                      property={translate(name)}
                      value={translate(description)}
                    />
                  ))}
                </KeyValueList>
              </ContentSection>
            )}

            {hasLegalResource.length > 0 && (
              <ContentSection
                id="hasLegalResource"
                title={
                  translations.detailsPage.sectionTitles.publicService
                    .legalResources
                }
              >
                <KeyValueList>
                  {hasLegalResource.map(({ description }, index) => (
                    <KeyValueListItem
                      key={`${translate(description)}-${index}`}
                      property={translate(description)}
                      value=""
                    />
                  ))}
                </KeyValueList>
              </ContentSection>
            )}

            {hasParticipation.length > 0 && (
              <ContentSection
                id="hasParticipation"
                title={
                  translations.detailsPage.sectionTitles.publicService
                    .participation
                }
              >
                <KeyValueList>
                  {hasParticipation.map(({ description, role }, index) => (
                    <KeyValueListItem
                      key={`${translate(description)}-${index}`}
                      property={translate(description)}
                      value={role
                        .map(({ prefLabel }) => translate(prefLabel))
                        .filter(Boolean)
                        .join(', ')}
                    />
                  ))}
                </KeyValueList>
              </ContentSection>
            )}

            {hasInput.length > 0 && (
              <ContentSection
                id="hasInput"
                title={
                  translations.detailsPage.sectionTitles.publicService
                    .attachment
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

            {requiredServices.length > 0 && (
              <ContentSection
                id="relatedServices"
                title={
                  translations.detailsPage.sectionTitles.publicService
                    .relatedServices
                }
              >
                <KeyValueList>
                  <KeyValueListItem
                    property={translations.requires}
                    value={
                      <InlineList>
                        {requiredServices.map(
                          ({ uri, title }: PublicService, index) =>
                            publicServicesMap?.[uri] ? (
                              <Link
                                as={RouterLink}
                                to={`${PATHNAME_PUBLIC_SERVICES}/${publicServicesMap[uri]?.id}`}
                                key={`${uri}-${index}`}
                              >
                                {translate(title)}
                              </Link>
                            ) : (
                              translate(title)
                            )
                        )}
                      </InlineList>
                    }
                  />
                </KeyValueList>
              </ContentSection>
            )}
            {isClassifiedBy.length > 0 && (
              <ContentSection
                id="concept-references"
                title={
                  translations.detailsPage.sectionTitles.publicService
                    .conceptReferences
                }
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
                          value=""
                        />
                      )
                  )}
                </KeyValueList>
              </ContentSection>
            )}
          </DetailsPage>
        </ThemeProvider>
      )
    : null;
};

export default compose(
  memo,
  withConcepts,
  withPublicService,
  withPublicServices
)(PublicServiceDetailsPage);
