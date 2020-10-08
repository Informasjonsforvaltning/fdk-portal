import React, { memo, FC, useLayoutEffect, Fragment } from 'react';
import { compose } from 'redux';
import type { RouteComponentProps } from 'react-router-dom';
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

import SC from './styled';
import ReactTooltipSC from '../../../../components/tooltip/styled';

import type { Rating } from '../../../../types';
import {
  DimensionType,
  IndicatorType,
  RatingCategory
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

export const determineRatingIcon = (r: Rating | null | undefined) => {
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

export const calculateRatingPercentage = (
  r: Pick<Rating, 'score' | 'maxScore'> | null | undefined
) => {
  const score = r?.score ?? 0;
  const maxScore = r?.maxScore ?? 0;

  return maxScore === 0 ? 0 : Math.round((score / maxScore) * 100);
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
                        <SC.DimensionContainer>
                          <p>{determineDimensionTranslation(type)}</p>
                          <div
                            data-tip={
                              translations.metadataQualityPage.tooltipText?.[
                                type
                              ]
                            }
                            data-for={`${type}_tooltip`}
                          >
                            <SC.QuestionIcon />
                          </div>
                          <ReactTooltipSC.ReactTooltipStyled
                            id={`${type}_tooltip`}
                            effect="solid"
                            place="top"
                            multiline
                          />
                        </SC.DimensionContainer>
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
                          <span>
                            {conforms ? <SC.CheckIcon /> : <SC.CrossIcon />}
                          </span>
                          <p>{determineIndicatorTranslation(type)}</p>
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
            <Link href={`/news/${articleIds[translations.getLanguage()]}`}>
              {translations.metadataQualityPage.whatIsMetadataQualityFaqLink}
            </Link>
          </SC.Question>
        </SC.FrequentlyAskedQuestions>
      </SC.Section>
    </SC.DatasetPage>
  );
};

export default compose<FC>(memo, withOrganization)(DatasetPage);
