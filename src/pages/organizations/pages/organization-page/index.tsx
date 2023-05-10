import React, { FC, memo, useState, useLayoutEffect } from 'react';
import { compose } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Link from '@fellesdatakatalog/link';
import SvgIcon from '@fellesdatakatalog/icons';

import { getConfig } from '../../../../config';

import withOrganization, {
  Props as OrganizationProps
} from '../../../../components/with-organization';
import withReport, {
  Props as ReportProps
} from '../../../../components/with-report';
import withErrorBoundary from '../../../../components/with-error-boundary';
import ErrorPage from '../../../../components/error-page';

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

import {
  PATHNAME_DATASETS,
  PATHNAME_DATA_SERVICES,
  PATHNAME_CONCEPTS,
  PATHNAME_INFORMATIONMODELS,
  PATHNAME_GUIDANCE_METADATA
} from '../../../../constants/constants';

import { themeFDK, themeNAP } from '../../../../app/theme';

import {
  Entity,
  Filter,
  MetadataQualityRatingCategory
} from '../../../../types/enums';
import Spinner from '../../../../components/spinner';
import { mapScoreToRatingCategory } from '../../../../utils/metadata-quality';

interface RouteParams {
  organizationId: string;
}

interface Props
  extends OrganizationProps,
    ReportProps,
    RouteComponentProps<RouteParams> {}

const renderPlaceholder = (isLoading: boolean) =>
  isLoading ? <Spinner /> : <ErrorPage errorCode='404' />;

const OrganizationPage: FC<Props> = ({
  organization,
  rating,
  isLoadingOrganization,
  isLoadingRating,
  organizationActions: {
    getOrganizationRequested: getOrganization,
    getOrganizationRatingRequested: getRating
  },
  reportActions: { resetDatasetsReport },
  match: {
    url,
    params: { organizationId }
  }
}) => {
  const [showOrganizationLogo, setShowOrganizationLogo] = useState(true);

  const isTransportportal = getConfig().themeNap;
  const theme = isTransportportal ? themeNAP : themeFDK;

  useLayoutEffect(() => {
    if (organization?.organizationId !== organizationId) {
      getOrganization(organizationId);
    }

    if (rating?.organization?.organizationId !== organizationId) {
      getRating(
        organizationId,
        isTransportportal ? 'transportportal' : undefined
      );
    }

    return () => {
      resetDatasetsReport();
    };
  }, []);

  const determineRatingIcon = () => {
    switch (mapScoreToRatingCategory(rating?.datasets?.quality?.score ?? 0)) {
      case MetadataQualityRatingCategory.EXCELLENT:
        return <SvgIcon name='smileyExcitedStroke' />;
      case MetadataQualityRatingCategory.GOOD:
        return <SvgIcon name='smileyHappyStroke' />;
      case MetadataQualityRatingCategory.SUFFICIENT:
        return <SvgIcon name='smileyNeutralStroke' />;
      case MetadataQualityRatingCategory.POOR:
      default:
        return <SvgIcon name='smileySadStroke' />;
    }
  };

  const determineRatingTranslation = () => {
    switch (mapScoreToRatingCategory(rating?.datasets?.quality?.score ?? 0)) {
      case MetadataQualityRatingCategory.EXCELLENT:
        return translations.metadataQualityPage.metadataQualityIsExcellent;
      case MetadataQualityRatingCategory.GOOD:
        return translations.metadataQualityPage.metadataQualityIsGood;
      case MetadataQualityRatingCategory.SUFFICIENT:
        return translations.metadataQualityPage.metadataQualityIsSufficient;
      case MetadataQualityRatingCategory.POOR:
      default:
        return translations.metadataQualityPage.metadataQualityIsPoor;
    }
  };

  return organization && rating ? (
    <SC.OrganizationPage className='container'>
      <SC.Title>
        {translations.formatString(
          translations.metadataQualityPage.organizationPageTitle,
          {
            organizationName:
              (translate(organization?.prefLabel) ||
                translate(organization?.name)) ??
              ''
          }
        )}
      </SC.Title>
      <SC.Section>
        {organization && rating?.organization && (
          <SC.OrganizationInformation>
            {showOrganizationLogo && organization.organizationId && (
              <img
                src={`https://orglogo.difi.no/api/logo/org/${organization.organizationId}`}
                alt={`${organization.name} logo`}
                onError={() => setShowOrganizationLogo(false)}
              />
            )}
            <ul>
              <li>
                <span>{translations.metadataQualityPage.organisationName}</span>
                <span>{organization.name}</span>
              </li>
              <li>
                <span>
                  {translations.metadataQualityPage.organisationNumber}
                </span>
                <span>
                  {organization.organizationId.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ' '
                  )}
                </span>
              </li>
              <li>
                <span>{translations.metadataQualityPage.organisationForm}</span>
                <span>{rating.organization.orgType}</span>
              </li>
              {rating.organization.industryCode && (
                <li>
                  <span>
                    {translations.metadataQualityPage.organisationBusinessCodes}
                  </span>
                  <span>{`${rating.organization.industryCode}`}</span>
                </li>
              )}
              {rating.organization.sectorCode && (
                <li>
                  <span>
                    {
                      translations.metadataQualityPage
                        .organisationInstitutionalSectorCode
                    }
                  </span>
                  <span>{`${rating.organization.sectorCode}`}</span>
                </li>
              )}
              {rating.organization.homepage && (
                <li>
                  <span>
                    {translations.metadataQualityPage.organisationHomePage}
                  </span>
                  <span>
                    <Link
                      href={`//${rating.organization.homepage.replace(
                        /\/$/,
                        ''
                      )}`}
                      external
                    >
                      {rating.organization.homepage.replace(/\/$/, '')}
                    </Link>
                  </span>
                </li>
              )}
              {rating.organization.numberOfEmployees && (
                <li>
                  <span>
                    {translations.organizationsPage.numberOfEmployees}
                  </span>
                  <span>
                    {rating.organization.numberOfEmployees.toLocaleString()}
                  </span>
                </li>
              )}
              <li>
                <span>
                  {translations.metadataQualityPage.organisationMoreInfo}
                </span>
                <span>
                  <Link
                    href={`https://data.brreg.no/enhetsregisteret/oppslag/enheter/${organization.organizationId}`}
                    external
                  >
                    {translations.formatString(
                      translations.metadataQualityPage
                        .organisationInEnhetsregisteret,
                      {
                        organizationName: translate(organization?.name) ?? ''
                      }
                    )}
                  </Link>
                </span>
              </li>
            </ul>
          </SC.OrganizationInformation>
        )}
      </SC.Section>
      <SC.Section />
      <SC.Section>
        <ThemeProvider theme={theme.extendedColors[Entity.DATASET]}>
          <SC.DatasetCataloguesStatistics>
            <h2>
              <SvgIcon name='squareThreeStroke' />
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
                    icon={<SvgIcon name='squareThreeStroke' />}
                    count={rating?.datasets?.totalCount ?? 0}
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
                    icon={<SvgIcon name='plusStroke' />}
                    count={rating?.datasets?.newCount ?? 0}
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
                    icon={<SvgIcon name='starStroke' />}
                    count={rating?.datasets?.authoritativeCount ?? 0}
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
                    icon={<SvgIcon name='lockOpenStroke' />}
                    count={rating?.datasets?.openCount ?? 0}
                  />
                  <StatisticsRegularSC.StatisticsRegular.Label>
                    {translations.formatString(
                      translations.metadataQualityPage.datasetIs,
                      translations.metadataQualityPage.open
                    )}
                  </StatisticsRegularSC.StatisticsRegular.Label>
                </StatisticsRegular>
              </SC.Box>
              {rating && (
                <SC.Box>
                  <StatisticsRegular to={`${url}/datasets`}>
                    <StatisticsRegularSC.StatisticsRegular.Label>
                      <IllustrationWithCount
                        icon={determineRatingIcon()}
                        percentage={rating?.datasets?.quality?.percentage || 0}
                      />
                      {determineRatingTranslation()}
                    </StatisticsRegularSC.StatisticsRegular.Label>
                  </StatisticsRegular>
                </SC.Box>
              )}
            </div>
          </SC.DatasetCataloguesStatistics>
        </ThemeProvider>
        {!isTransportportal && (
          <>
            <ThemeProvider theme={theme.extendedColors[Entity.DATA_SERVICE]}>
              <SC.DataserviceCataloguesStatistics>
                <h2>
                  <SvgIcon name='gearStroke' />
                  {
                    translations.metadataQualityPage
                      .dataserviceCatalogStatistics
                  }
                </h2>
                <div>
                  <SC.Box>
                    <StatisticsRegular
                      to={`${PATHNAME_DATA_SERVICES}${patchSearchQuery(
                        Filter.ORGPATH,
                        organization?.orgPath
                      )}`}
                    >
                      <IllustrationWithCount
                        icon={<SvgIcon name='gearStroke' />}
                        count={rating?.dataservices?.totalCount ?? 0}
                      />
                      <StatisticsRegularSC.StatisticsRegular.Label>
                        {translations.metadataQualityPage.descriptionsTotal}
                      </StatisticsRegularSC.StatisticsRegular.Label>
                    </StatisticsRegular>
                  </SC.Box>
                  <SC.Box>
                    <StatisticsRegular
                      to={`${PATHNAME_DATA_SERVICES}${patchListOfSearchQuery({
                        [Filter.ORGPATH]: organization?.orgPath,
                        [Filter.LASTXDAYS]: '7'
                      })}`}
                    >
                      <IllustrationWithCount
                        icon={<SvgIcon name='plusStroke' />}
                        count={rating?.dataservices?.newCount ?? 0}
                      />
                      <StatisticsRegularSC.StatisticsRegular.Label>
                        {translations.formatString(
                          translations.metadataQualityPage.newDescriptions,
                          translations.metadataQualityPage.lastWeek
                        )}
                      </StatisticsRegularSC.StatisticsRegular.Label>
                    </StatisticsRegular>
                  </SC.Box>
                </div>
              </SC.DataserviceCataloguesStatistics>
            </ThemeProvider>
            <ThemeProvider theme={theme.extendedColors[Entity.CONCEPT]}>
              <SC.ConceptCataloguesStatistics>
                <h2>
                  <SvgIcon name='bookBookmarkStroke' />
                  {translations.metadataQualityPage.conceptCatalogStatistics}
                </h2>
                <div>
                  <SC.Box>
                    <StatisticsRegular
                      to={`${PATHNAME_CONCEPTS}${patchSearchQuery(
                        Filter.ORGPATH,
                        organization?.orgPath
                      )}`}
                    >
                      <IllustrationWithCount
                        icon={<SvgIcon name='bookBookmarkStroke' />}
                        count={rating?.concepts?.totalCount ?? 0}
                      />
                      <StatisticsRegularSC.StatisticsRegular.Label>
                        {translations.metadataQualityPage.descriptionsTotal}
                      </StatisticsRegularSC.StatisticsRegular.Label>
                    </StatisticsRegular>
                  </SC.Box>
                  <SC.Box>
                    <StatisticsRegular
                      to={`${PATHNAME_CONCEPTS}${patchListOfSearchQuery({
                        [Filter.ORGPATH]: organization?.orgPath,
                        [Filter.LASTXDAYS]: '7'
                      })}`}
                    >
                      <IllustrationWithCount
                        icon={<SvgIcon name='plusStroke' />}
                        count={rating?.concepts?.newCount ?? 0}
                      />
                      <StatisticsRegularSC.StatisticsRegular.Label>
                        {translations.formatString(
                          translations.metadataQualityPage.newDescriptions,
                          translations.metadataQualityPage.lastWeek
                        )}
                      </StatisticsRegularSC.StatisticsRegular.Label>
                    </StatisticsRegular>
                  </SC.Box>
                </div>
              </SC.ConceptCataloguesStatistics>
            </ThemeProvider>
            <ThemeProvider
              theme={theme.extendedColors[Entity.INFORMATION_MODEL]}
            >
              <SC.InformationModelCataloguesStatistics>
                <h2>
                  <SvgIcon name='infoModelStroke' />
                  {
                    translations.metadataQualityPage
                      .informationModelCatalogStatistics
                  }
                </h2>
                <div>
                  <SC.Box>
                    <StatisticsRegular
                      to={`${PATHNAME_INFORMATIONMODELS}${patchSearchQuery(
                        Filter.ORGPATH,
                        organization?.orgPath
                      )}`}
                    >
                      <IllustrationWithCount
                        icon={<SvgIcon name='infoModelStroke' />}
                        count={rating?.informationmodels?.totalCount ?? 0}
                      />
                      <StatisticsRegularSC.StatisticsRegular.Label>
                        {translations.metadataQualityPage.descriptionsTotal}
                      </StatisticsRegularSC.StatisticsRegular.Label>
                    </StatisticsRegular>
                  </SC.Box>
                  <SC.Box>
                    <StatisticsRegular
                      to={`${PATHNAME_INFORMATIONMODELS}${patchListOfSearchQuery(
                        {
                          [Filter.ORGPATH]: organization?.orgPath,
                          [Filter.LASTXDAYS]: '7'
                        }
                      )}`}
                    >
                      <IllustrationWithCount
                        icon={<SvgIcon name='plusStroke' />}
                        count={rating?.informationmodels?.newCount ?? 0}
                      />
                      <StatisticsRegularSC.StatisticsRegular.Label>
                        {translations.formatString(
                          translations.metadataQualityPage.newDescriptions,
                          translations.metadataQualityPage.lastWeek
                        )}
                      </StatisticsRegularSC.StatisticsRegular.Label>
                    </StatisticsRegular>
                  </SC.Box>
                </div>
              </SC.InformationModelCataloguesStatistics>
            </ThemeProvider>
          </>
        )}
      </SC.Section>
      <SC.Section>
        <SC.FrequentlyAskedQuestions>
          <SC.Question>
            <h3>
              {translations.metadataQualityPage.whatIsMetadataQualityFaqTitle}
            </h3>
            <p>
              {
                translations.metadataQualityPage
                  .whatIsMetadataQualityFaqDescription
              }
            </p>
            <Link href={PATHNAME_GUIDANCE_METADATA}>
              {translations.metadataQualityPage.whatIsMetadataQualityFaqLink}
            </Link>
          </SC.Question>
        </SC.FrequentlyAskedQuestions>
      </SC.Section>
    </SC.OrganizationPage>
  ) : (
    renderPlaceholder(isLoadingOrganization || isLoadingRating)
  );
};

export default compose<FC>(
  memo,
  withOrganization,
  withReport,
  withErrorBoundary(ErrorPage)
)(OrganizationPage);
