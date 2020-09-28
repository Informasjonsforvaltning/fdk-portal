import React, { memo, FC, useLayoutEffect, Fragment } from 'react';
import { compose } from 'redux';
import type { RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Link from '@fellesdatakatalog/link';

import translations from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';

import withOrganization, {
  Props as OrganizationProps
} from '../../../../components/with-organization';

import ExpansionPanel, {
  ExpansionPanelHead,
  ExpansionPanelBody
} from '../../../../components/expansion-panel';
import {
  IllustrationWithCount,
  SC as StatisticsRegularSC,
  StatisticsRegular
} from '../../../../components/statistics-regular/statistics-regular';

import SC from './styled';
import ReactTooltipSC from '../../../../components/tooltip/styled';

import { themeFDK as theme } from '../../../../app/theme';

import type { Rating } from '../../../../types';
import {
  DimensionType,
  IndicatorType,
  RatingCategory,
  Entity
} from '../../../../types/enums';

interface RouteParams {
  organizationId: string;
  datasetId: string;
}

interface Props extends OrganizationProps, RouteComponentProps<RouteParams> {}

const articleIds: { [key: string]: string } = {
  nb: '701a4b80-d830-4aa5-be63-20422e3d8d64',
  nn: '5892cae9-2b31-4f52-b0a6-da87092924bf',
  en: 'cf2a2b6d-88bb-4f3a-bbfc-4114e2841479'
};

const DatasetPage: FC<Props> = ({
  organization,
  dataset,
  organizationActions: {
    getOrganizationRequested: getOrganization,
    getOrganizationDatasetRequested: getOrganizationDataset
  },
  match: {
    params: { organizationId, datasetId }
  }
}) => {
  useLayoutEffect(() => {
    if (organization?.id !== organizationId) {
      getOrganization(organizationId);
    }

    if (dataset?.id !== datasetId) {
      getOrganizationDataset(organizationId, datasetId);
    }
  }, []);

  const isAuthoritative = dataset?.provenance?.code === 'NASJONAL';

  const calculateRatingPercentage = (r: Rating | null | undefined) => {
    const score = r?.score ?? 0;
    const maxScore = r?.maxScore ?? 0;

    return maxScore === 0 ? 0 : Math.round((score / maxScore) * 100);
  };

  const determineRatingIcon = (r: Rating | null | undefined) => {
    switch (r?.category) {
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

  const determineRatingTranslation = (r: Rating | null | undefined) => {
    switch (r?.category) {
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

  const determineDimensionTranslation = (dimensionType: DimensionType) => {
    switch (dimensionType) {
      case DimensionType.ACCESSIBILITY:
        return translations.metadataQualityPage.criteria.accessibility;
      case DimensionType.FINDABILITY:
        return translations.metadataQualityPage.criteria.findability;
      case DimensionType.INTEROPERABILITY:
        return translations.metadataQualityPage.criteria.interoperability;
      case DimensionType.READABILITY:
        return translations.metadataQualityPage.criteria.readability;
      case DimensionType.REUSABILITY:
        return translations.metadataQualityPage.criteria.reusability;
      default:
        return null;
    }
  };

  const determineIndicatorTranslation = (indicatorType: IndicatorType) => {
    switch (indicatorType) {
      case IndicatorType.DISTRIBUTABLE_DATA:
        return translations.metadataQualityPage.indicator.distributableData;
      case IndicatorType.KEYWORD_USAGE:
        return translations.metadataQualityPage.indicator.keywordUsage;
      case IndicatorType.SUBJECT_USAGE:
        return translations.metadataQualityPage.indicator.subjectUsage;
      case IndicatorType.GEO_SEARCH:
        return translations.metadataQualityPage.indicator.geoSearch;
      case IndicatorType.CONTROLLED_VOCABULARY_USAGE:
        return translations.metadataQualityPage.indicator
          .controlledVocabularyUsage;
      case IndicatorType.LICENSE_INFORMATION:
        return translations.metadataQualityPage.indicator.licenseInformation;
      case IndicatorType.CONTACT_POINT:
        return translations.metadataQualityPage.indicator.contactPoint;
      case IndicatorType.TITLE:
        return translations.metadataQualityPage.indicator.title;
      case IndicatorType.TITLE_NO_ORG_NAME:
        return translations.metadataQualityPage.indicator.titleNoOrgName;
      case IndicatorType.DESCRIPTION:
        return translations.metadataQualityPage.indicator.description;
      case IndicatorType.DESCRIPTION_WITHOUT_TITLE:
        return translations.metadataQualityPage.indicator
          .descriptionWithoutTitle;
      default:
        return null;
    }
  };

  const determineIndicatorDescriptionTranslation = (
    indicatorType: IndicatorType
  ) => {
    switch (indicatorType) {
      case IndicatorType.DISTRIBUTABLE_DATA:
        return translations.metadataQualityPage.indicatorDescription
          .distributableData;
      case IndicatorType.KEYWORD_USAGE:
        return translations.metadataQualityPage.indicatorDescription
          .keywordUsage;
      case IndicatorType.SUBJECT_USAGE:
        return translations.metadataQualityPage.indicatorDescription
          .subjectUsage;
      case IndicatorType.GEO_SEARCH:
        return translations.metadataQualityPage.indicatorDescription.geoSearch;
      case IndicatorType.CONTROLLED_VOCABULARY_USAGE:
        return translations.metadataQualityPage.indicatorDescription
          .controlledVocabularyUsage;
      case IndicatorType.LICENSE_INFORMATION:
        return translations.metadataQualityPage.indicatorDescription
          .licenseInformation;
      case IndicatorType.CONTACT_POINT:
        return translations.metadataQualityPage.indicatorDescription
          .contactPoint;
      case IndicatorType.TITLE:
        return translations.metadataQualityPage.indicatorDescription.title;
      case IndicatorType.TITLE_NO_ORG_NAME:
        return translations.metadataQualityPage.indicatorDescription
          .titleNoOrgName;
      case IndicatorType.DESCRIPTION:
        return translations.metadataQualityPage.indicatorDescription
          .description;
      case IndicatorType.DESCRIPTION_WITHOUT_TITLE:
        return translations.metadataQualityPage.indicatorDescription
          .descriptionWithoutTitle;
      default:
        return null;
    }
  };

  return (
    <SC.DatasetPage className="container">
      <SC.Banner>
        <SC.BetaRibbon>BETA</SC.BetaRibbon>
        <h1>
          {translations.metadataQualityPage.organizationDatasetPageSubtitle}
        </h1>
        <div>
          <SC.DatasetIcon />
          <SC.Title>
            {translate(dataset?.title)}
            {isAuthoritative && (
              <div data-tip={translations.authoritativeDatasetTooltip}>
                <SC.AuthoritativeIcon />
                <ReactTooltipSC.ReactTooltipStyled effect="solid" multiline />
              </div>
            )}
          </SC.Title>
        </div>
      </SC.Banner>
      <SC.Section>
        <ThemeProvider theme={theme.extendedColors[Entity.DATASET]}>
          <SC.SummaryBoxes>
            <SC.Box>
              <StatisticsRegular to="">
                <StatisticsRegularSC.StatisticsRegular.Label>
                  <IllustrationWithCount
                    icon={determineRatingIcon(dataset?.assessment?.rating)}
                    percentage={calculateRatingPercentage(
                      dataset?.assessment?.rating
                    )}
                  />
                  {determineRatingTranslation(dataset?.assessment?.rating)}
                </StatisticsRegularSC.StatisticsRegular.Label>
              </StatisticsRegular>
            </SC.Box>
            <SC.Box>
              <StatisticsRegular to="">
                <IllustrationWithCount
                  count={dataset?.assessment?.rating?.satisfiedCriteria ?? 0}
                />
                <StatisticsRegularSC.StatisticsRegular.Label>
                  {
                    translations.metadataQualityPage
                      .metadataQualitySatisfiedCriteria
                  }
                </StatisticsRegularSC.StatisticsRegular.Label>
              </StatisticsRegular>
            </SC.Box>
          </SC.SummaryBoxes>
        </ThemeProvider>
      </SC.Section>
      <SC.Section>
        <SC.Table>
          <SC.TableHead>
            <tr>
              <th>
                <p>{translations.metadataQualityPage.criterion}</p>
                <p>{translations.metadataQualityPage.metadataQuality}</p>
              </th>
            </tr>
          </SC.TableHead>
          <SC.TableBody>
            {dataset?.assessment?.dimensions?.map(
              ({ type, rating, indicators }) => (
                <Fragment key={type}>
                  <tr className="section-row">
                    <td>
                      <div>
                        <p>{determineDimensionTranslation(type)}</p>
                        <div>
                          {determineRatingIcon(rating)}
                          <span>{calculateRatingPercentage(rating)}%</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                  {indicators.map(({ type, conforms, weight }) => (
                    <tr key={type}>
                      <ExpansionPanel as="td">
                        <ExpansionPanelHead>
                          <p>{determineIndicatorTranslation(type)}</p>
                          <span>
                            {conforms ? <SC.CheckIcon /> : <SC.CrossIcon />}
                          </span>
                        </ExpansionPanelHead>
                        <ExpansionPanelBody>
                          <p>
                            {determineIndicatorDescriptionTranslation(type)}
                          </p>
                          <span>
                            {translations.formatString(
                              translations.metadataQualityPage.indicatorWeight,
                              { weight }
                            )}
                          </span>
                        </ExpansionPanelBody>
                      </ExpansionPanel>
                    </tr>
                  ))}
                </Fragment>
              )
            )}
          </SC.TableBody>
        </SC.Table>
      </SC.Section>
      <SC.Section>
        <Link href={`/news/${articleIds[translations.getLanguage()]}`}>
          {translations.metadataQualityPage.learnMoreAboutMetadataQuality}
        </Link>
      </SC.Section>
    </SC.DatasetPage>
  );
};

export default compose<FC>(memo, withOrganization)(DatasetPage);
