import React, { memo, FC, useEffect, useState } from 'react';
import { compose } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import translations from '../../lib/localization';
import { getTranslateText as translate } from '../../lib/translateText';
import { dateStringToDate, formatDate } from '../../lib/date-utils';

import { themeFDK } from '../../app/theme';

import withPublicService, {
  Props as PublicServiceProps
} from '../with-public-service';

import DetailsPage, { ContentSection } from '../details-page';

import type { Theme } from '../../types';
import { Entity } from '../../types/enums';

interface RouteParams {
  publicServiceId: string;
}

interface Props extends PublicServiceProps, RouteComponentProps<RouteParams> {}

const PublicServiceDetailsPage: FC<Props> = ({
  publicService,
  publicServiceActions: { getPublicServiceRequested: getPublicService },
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

    return function cleanup() {
      setIsMounted(false);
    };
  }, []);

  const title = translate(publicService?.title);
  const description = translate(publicService?.description);

  const lastPublished = formatDate(
    dateStringToDate(publicService?.harvest?.firstHarvested)
  );

  const themes: Theme[] = [];

  return isMounted
    ? publicService && (
        <ThemeProvider theme={theme}>
          <DetailsPage
            entity={entity}
            title={title}
            publisher={publicService?.hasCompetentAuthority[0]}
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
          </DetailsPage>
        </ThemeProvider>
      )
    : null;
};

export default compose(memo, withPublicService)(PublicServiceDetailsPage);
