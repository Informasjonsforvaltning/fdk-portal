import React, { FC, memo, useLayoutEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Link from '@fellesdatakatalog/link';

import { getConfig } from '../../../../config';

import withOrganization, {
  Props as OrganizationProps
} from '../../../../components/with-organization';
import withReport, {
  Props as ReportProps
} from '../../../../components/with-report';

import { getTranslateText as translate } from '../../../../lib/translateText';
import translations from '../../../../lib/localization';
import {
  patchListOfSearchQuery,
  patchSearchQuery
} from '../../../../lib/addOrReplaceUrlParam';

import {
  IllustrationWithCount,
  SC as StatisticsRegularSC,
  StatisticsRegular
} from '../../../../components/statistics-regular/statistics-regular';

import SC from './styled';

import DatasetIcon from '../../../../images/icon-catalog-dataset-lg.svg';
import AccessOpenIcon from '../../../../images/icon-access-open-md-v2.svg';
import AuthoritativeIcon from '../../../../images/icon-authoritative-md.svg';
import NewIcon from '../../../../images/icon-new-md.svg';

import { PATHNAME_DATASETS } from '../../../../constants/constants';

import { themeFDK, themeNAP } from '../../../../app/theme';

import { Entity, Filter, RatingCategory } from '../../../../types/enums';

interface RouteParams {
  organizationId: string;
}

interface Props
  extends OrganizationProps,
    ReportProps,
    RouteComponentProps<RouteParams> {}

const articleIds: { [key: string]: string } = {
  nb: '701a4b80-d830-4aa5-be63-20422e3d8d64',
  nn: '5892cae9-2b31-4f52-b0a6-da87092924bf',
  en: 'cf2a2b6d-88bb-4f3a-bbfc-4114e2841479'
};

const OrganizationPage: FC<Props> = ({
  datasets,
  organization,
  rating,
  datasetsReport,
  organizationActions: {
    getOrganizationRequested: getOrganization,
    getCatalogRatingRequested: getRating
  },
  reportActions: {
    getDatasetsReportRequested: getDatasetsReport,
    resetDatasetsReport
  },
  match: {
    url,
    params: { organizationId }
  }
}) => {
  useLayoutEffect(() => {
    if (organization?.organizationId !== organizationId) {
      getOrganization(organizationId);
      getRating(organizationId);
    }

    return () => {
      resetDatasetsReport();
    };
  }, []);

  useLayoutEffect(() => {
    if (organization?.organizationId === organizationId) {
      getDatasetsReport({ orgPath: organization.orgPath });
    }
  }, [organization?.organizationId]);

  const ratingPercentage = Math.round(
    ((rating?.score ?? 0) / (rating?.maxScore ?? 0)) * 100
  );

  const theme = getConfig().themeNap ? themeNAP : themeFDK;

  const determineRatingIcon = () => {
    switch (rating?.category) {
      case RatingCategory.EXCELLENT:
        return <SC.ExcellentQualityIcon />;
      case RatingCategory.GOOD:
        return <SC.GoodQualityIcon />;
      case RatingCategory.SUFFICIENT:
        return <SC.SufficientQualityIcon />;
      case RatingCategory.POOR:
      default:
        return <SC.PoorQualityIcon />;
    }
  };

  const determineRatingTranslation = () => {
    switch (rating?.category) {
      case RatingCategory.EXCELLENT:
        return translations.metadataQualityPage.metadataQualityIsExcellent;
      case RatingCategory.GOOD:
        return translations.metadataQualityPage.metadataQualityIsGood;
      case RatingCategory.SUFFICIENT:
        return translations.metadataQualityPage.metadataQualityIsSufficient;
      case RatingCategory.POOR:
      default:
        return translations.metadataQualityPage.metadataQualityIsPoor;
    }
  };

  return (
    <SC.OrganizationPage className="container">
      <SC.BetaRibbon>BETA</SC.BetaRibbon>
      <SC.Title>
        {translations.formatString(
          translations.metadataQualityPage.organizationPageTitle,
          {
            organizationName:
              translate(organization?.prefLabel) || organization?.name
          }
        )}
      </SC.Title>
      <SC.Section>
        {/* <SC.OrganizationInformation>
          <pre>{JSON.stringify(organization, null, 2)}</pre>
        </SC.OrganizationInformation> */}
      </SC.Section>
      <SC.Section />
      <SC.Section>
        <ThemeProvider theme={theme.extendedColors[Entity.DATASET]}>
          <SC.DatasetCataloguesStatistics>
            <h2>
              <DatasetIcon />
              {translations.metadataQualityPage.datasetCatalogStatistics}
            </h2>
            <div>
              <SC.Box>
                <StatisticsRegular
                  to={`${PATHNAME_DATASETS}${patchSearchQuery(
                    Filter.ORGPATH,
                    organization?.orgPath
                  )}`}
                >
                  <IllustrationWithCount
                    icon={<DatasetIcon />}
                    count={datasetsReport?.totalObjects ?? 0}
                  />
                  <StatisticsRegularSC.StatisticsRegular.Label>
                    {translations.metadataQualityPage.descriptionsTotal}
                  </StatisticsRegularSC.StatisticsRegular.Label>
                </StatisticsRegular>
              </SC.Box>
              <SC.Box>
                <StatisticsRegular
                  to={`${PATHNAME_DATASETS}${patchListOfSearchQuery({
                    [Filter.ORGPATH]: organization?.orgPath,
                    [Filter.LASTXDAYS]: '7'
                  })}`}
                >
                  <IllustrationWithCount
                    icon={<NewIcon />}
                    count={datasetsReport?.newLastWeek ?? 0}
                  />
                  <StatisticsRegularSC.StatisticsRegular.Label>
                    {translations.formatString(
                      translations.metadataQualityPage.newDescriptions,
                      translations.metadataQualityPage.lastWeek
                    )}
                  </StatisticsRegularSC.StatisticsRegular.Label>
                </StatisticsRegular>
              </SC.Box>
              <SC.Box>
                <StatisticsRegular
                  to={`${PATHNAME_DATASETS}${patchListOfSearchQuery({
                    [Filter.ORGPATH]: organization?.orgPath,
                    [Filter.PROVENANCE]: 'NASJONAL'
                  })}`}
                >
                  <IllustrationWithCount
                    icon={<AuthoritativeIcon />}
                    count={datasetsReport?.nationalComponent ?? 0}
                  />
                  <StatisticsRegularSC.StatisticsRegular.Label>
                    {translations.formatString(
                      translations.metadataQualityPage.datasetIs,
                      translations.metadataQualityPage.authoritativeSources
                    )}
                  </StatisticsRegularSC.StatisticsRegular.Label>
                </StatisticsRegular>
              </SC.Box>
              <SC.Box>
                <StatisticsRegular
                  to={`${PATHNAME_DATASETS}${patchListOfSearchQuery({
                    [Filter.ORGPATH]: organization?.orgPath,
                    [Filter.OPENDATA]: 'true'
                  })}`}
                >
                  <IllustrationWithCount
                    icon={<AccessOpenIcon />}
                    count={datasetsReport?.opendata ?? 0}
                  />
                  <StatisticsRegularSC.StatisticsRegular.Label>
                    {translations.formatString(
                      translations.metadataQualityPage.datasetIs,
                      translations.metadataQualityPage.open
                    )}
                  </StatisticsRegularSC.StatisticsRegular.Label>
                </StatisticsRegular>
              </SC.Box>
            </div>
            {datasets.length > 0 && rating && (
              <div>
                <SC.Box colspan={2}>
                  <StatisticsRegular to={`${url}/datasets`}>
                    <StatisticsRegularSC.StatisticsRegular.Label>
                      <IllustrationWithCount
                        icon={determineRatingIcon()}
                        percentage={
                          isNaN(ratingPercentage) ? 0 : ratingPercentage
                        }
                      />
                      {determineRatingTranslation()}
                    </StatisticsRegularSC.StatisticsRegular.Label>
                  </StatisticsRegular>
                </SC.Box>
                <SC.Box colspan={2}>
                  <StatisticsRegular to={`${url}/datasets`}>
                    <IllustrationWithCount
                      count={rating?.satisfiedCriteria ?? 0}
                    />
                    <StatisticsRegularSC.StatisticsRegular.Label>
                      {
                        translations.metadataQualityPage
                          .metadataQualitySatisfiedCriteria
                      }
                    </StatisticsRegularSC.StatisticsRegular.Label>
                  </StatisticsRegular>
                </SC.Box>
              </div>
            )}
          </SC.DatasetCataloguesStatistics>
        </ThemeProvider>
      </SC.Section>
      <SC.Section>
        <Link href={`/news/${articleIds[translations.getLanguage()]}`}>
          {translations.metadataQualityPage.learnMoreAboutMetadataQuality}
        </Link>
      </SC.Section>
    </SC.OrganizationPage>
  );
};

export default compose<FC>(
  memo,
  withOrganization,
  withReport
)(OrganizationPage);
