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

interface RouteParams {
  publicServiceId: string;
}

interface Props
  extends PublicServiceProps,
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

  const publicServiceIdentifiers = (requiredServices.map(
    ({ uri }) => uri
  ) as string[]).filter(Boolean);

  const publicServicesMap = publicServices?.reduce(
    (previous, current) => ({ ...previous, [current.uri]: current }),
    {} as Record<string, any>
  );

  useEffect(() => {
    if (publicServiceIdentifiers.length > 0) {
      getPublicServices({ publicServiceIdentifiers, size: 1000 });
    }
  }, [publicServiceIdentifiers.join()]);

  const themes: Theme[] = [];

  return isMounted
    ? publicService && (
        <ThemeProvider theme={theme}>
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
            {publicService?.isClassifiedBy &&
              publicService.isClassifiedBy.length > 0 && (
                <ContentSection
                  id="concept-references"
                  title={
                    translations.detailsPage.sectionTitles.publicService
                      .conceptReferences
                  }
                >
                  <KeyValueList>
                    {publicService.isClassifiedBy?.map(
                      ({ uri, id, prefLabel, definition }) =>
                        uri && (
                          <KeyValueListItem
                            key={uri}
                            property={
                              id ? (
                                <Link
                                  as={RouterLink}
                                  to={`${PATHNAME_CONCEPTS}/${id}`}
                                >
                                  {translate(prefLabel)}
                                </Link>
                              ) : (
                                translate(prefLabel)
                              )
                            }
                            value={translate(definition)}
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
  withPublicService,
  withPublicServices
)(PublicServiceDetailsPage);
