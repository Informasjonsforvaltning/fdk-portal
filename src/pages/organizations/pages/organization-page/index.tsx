import React, { FC, memo, useState, useLayoutEffect } from 'react';
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

import {
  PATHNAME_DATASETS,
  PATHNAME_GUIDANCE_METADATA
} from '../../../../constants/constants';

import { themeFDK, themeNAP } from '../../../../app/theme';

import { Entity, Filter, RatingCategory } from '../../../../types/enums';

interface RouteParams {
  organizationId: string;
}

interface Props
  extends OrganizationProps,
    ReportProps,
    RouteComponentProps<RouteParams> {}

const OrganizationPage: FC<Props> = ({
  datasets,
  organization,
  enhetsregisteretOrganization,
  rating,
  datasetsReport,
  organizationActions: {
    getOrganizationRequested: getOrganization,
    getEnhetsregisteretOrganizationRequested: getEnhetsregisteretOrganization,
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
  const [showOrganizationLogo, setShowOrganizationLogo] = useState(true);

  const isTransportportal = getConfig().themeNap;
  const theme = isTransportportal ? themeNAP : themeFDK;

  useLayoutEffect(() => {
    if (organization?.organizationId !== organizationId) {
      getOrganization(organizationId);
      getEnhetsregisteretOrganization(organizationId);
      getRating(organizationId);
    }

    return () => {
      resetDatasetsReport();
    };
  }, []);

  useLayoutEffect(() => {
    if (organization?.organizationId === organizationId) {
      getDatasetsReport({
        orgPath: organization.orgPath,
        themeprofile: isTransportportal ? 'transport' : undefined
      });
    }
  }, [organization?.organizationId]);

  const ratingPercentage = Math.round(
    ((rating?.score ?? 0) / (rating?.maxScore ?? 0)) * 100
  );

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
        {enhetsregisteretOrganization && (
          <SC.OrganizationInformation>
            {showOrganizationLogo &&
              enhetsregisteretOrganization.organisasjonsnummer && (
                <img
                  src={`https://orglogo.difi.no/api/logo/org/${enhetsregisteretOrganization.organisasjonsnummer}`}
                  alt={`${enhetsregisteretOrganization.navn} logo`}
                  onError={() => setShowOrganizationLogo(false)}
                />
              )}
            <ul>
              <li>
                <span>{translations.metadataQualityPage.organisationName}</span>
                <span>{enhetsregisteretOrganization.navn}</span>
              </li>
              <li>
                <span>
                  {translations.metadataQualityPage.organisationNumber}
                </span>
                <span>
                  {enhetsregisteretOrganization.organisasjonsnummer.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ' '
                  )}
                </span>
              </li>
              <li>
                <span>{translations.metadataQualityPage.organisationForm}</span>
                <span>
                  {enhetsregisteretOrganization.organisasjonsform.beskrivelse}
                </span>
              </li>
              {enhetsregisteretOrganization.naeringskode1 && (
                <li>
                  <span>
                    {translations.metadataQualityPage.organisationBusinessCodes}
                  </span>
                  <span>{`${enhetsregisteretOrganization.naeringskode1.kode} ${enhetsregisteretOrganization.naeringskode1.beskrivelse}`}</span>
                </li>
              )}
              {enhetsregisteretOrganization.institusjonellSektorkode && (
                <li>
                  <span>
                    {
                      translations.metadataQualityPage
                        .organisationInstitutionalSectorCode
                    }
                  </span>
                  <span>{`${enhetsregisteretOrganization.institusjonellSektorkode.kode} ${enhetsregisteretOrganization.institusjonellSektorkode.beskrivelse}`}</span>
                </li>
              )}
              {enhetsregisteretOrganization.hjemmeside && (
                <li>
                  <span>
                    {translations.metadataQualityPage.organisationHomePage}
                  </span>
                  <span>
                    <Link
                      href={`//${enhetsregisteretOrganization.hjemmeside.replace(
                        /\/$/,
                        ''
                      )}`}
                      external
                    >
                      {enhetsregisteretOrganization.hjemmeside.replace(
                        /\/$/,
                        ''
                      )}
                    </Link>
                  </span>
                </li>
              )}
              <li>
                <span>
                  {translations.metadataQualityPage.organisationMoreInfo}
                </span>
                <span>
                  <Link
                    href={`https://data.brreg.no/enhetsregisteret/oppslag/enheter/${enhetsregisteretOrganization.organisasjonsnummer}`}
                    external
                  >
                    {translations.formatString(
                      translations.metadataQualityPage
                        .organisationInEnhetsregisteret,
                      {
                        organizationName:
                          enhetsregisteretOrganization.navn ?? ''
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
              {datasets.length > 0 && rating && (
                <SC.Box>
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
              )}
            </div>
          </SC.DatasetCataloguesStatistics>
        </ThemeProvider>
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
  );
};

export default compose<FC>(
  memo,
  withOrganization,
  withReport
)(OrganizationPage);
