import React, { memo, useLayoutEffect, Fragment, useEffect } from 'react';
import type { FC } from 'react';
import { compose } from 'redux';
import { Link as RouteLink } from 'react-router-dom';

import Link from '@fellesdatakatalog/link';
import ExpansionPanel, {
  ExpansionPanelHead,
  ExpansionPanelBody
} from '@fellesdatakatalog/expansion-panel';
import type { RouteComponentProps } from 'react-router-dom';

import translations from '../../../../lib/localization';
import { getTranslateText as translate } from '../../../../lib/translateText';

import {
  PATHNAME_GUIDANCE_METADATA,
  PATHNAME_DATASET_DETAILS
} from '../../../../constants/constants';

import withDataset from '../../../../components/with-dataset';
import type { Props as DatasetProps } from '../../../../components/with-dataset';
import withDatasetScores from '../../../../components/with-dataset-scores';
import type { Props as DatasetScoresProps } from '../../../../components/with-dataset-scores';
import withOrganization from '../../../../components/with-organization';
import type { Props as OrganizationProps } from '../../../../components/with-organization';
import withErrorBoundary from '../../../../components/with-error-boundary';
import ErrorPage from '../../../../components/error-page';

import SC from './styled';

import {
  MetadataQualityDimension,
  MetadataQualityMetric
} from '../../../../types/enums';
import {
  calculateRatingPercentage,
  determineRatingIcon
} from '../datasets-page';
import ExpansionIndicatorDefault from '../../../../components/expansion-indicator-default';

interface RouteParams {
  organizationId: string;
  datasetId: string;
}

interface Props
  extends DatasetProps,
    DatasetScoresProps,
    OrganizationProps,
    RouteComponentProps<RouteParams> {}

const DatasetPage: FC<Props> = ({
  dataset,
  datasetActions: { getDatasetRequested: getDataset },
  organization,
  organizationActions: { getOrganizationRequested: getOrganization },
  datasetScores,
  datasetScoresActions: { getDatasetScoresRequested: getDatasetScores },
  match: {
    params: { organizationId, datasetId }
  }
}) => {
  useLayoutEffect(() => {
    if (organization?.organizationId !== organizationId) {
      getOrganization(organizationId);
    }

    if (dataset?.id !== datasetId) {
      getDataset(datasetId);
    }
  }, []);

  useEffect(() => {
    const datasetScore = datasetScores
      ? Object.values(datasetScores.scores)[0]
      : null;
    if (datasetScore?.dataset?.id !== dataset?.id && dataset?.uri) {
      getDatasetScores({ datasets: [dataset.uri] });
    }
  }, [dataset?.id]);

  const determineDimensionTranslation = (dimensionId: string) => {
    switch (dimensionId) {
      case MetadataQualityDimension.ACCESSIBILITY:
        return translations.metadataQualityPage.dimension.accessibility;
      case MetadataQualityDimension.FINDABILITY:
        return translations.metadataQualityPage.dimension.findability;
      case MetadataQualityDimension.INTEROPERABILITY:
        return translations.metadataQualityPage.dimension.interoperability;
      case MetadataQualityDimension.CONTEXTUALITY:
        return translations.metadataQualityPage.dimension.contextuality;
      case MetadataQualityDimension.REUSABILITY:
        return translations.metadataQualityPage.dimension.reusability;
      default:
        return null;
    }
  };

  const determineDimensionDescriptionTranslation = (dimensionId: string) => {
    switch (dimensionId) {
      case MetadataQualityDimension.ACCESSIBILITY:
        return translations.metadataQualityPage.dimensionDescription
          .accessibility;
      case MetadataQualityDimension.FINDABILITY:
        return translations.metadataQualityPage.dimensionDescription
          .findability;
      case MetadataQualityDimension.INTEROPERABILITY:
        return translations.metadataQualityPage.dimensionDescription
          .interoperability;
      case MetadataQualityDimension.CONTEXTUALITY:
        return translations.metadataQualityPage.dimensionDescription
          .contextuality;
      case MetadataQualityDimension.REUSABILITY:
        return translations.metadataQualityPage.dimensionDescription
          .reusability;
      default:
        return null;
    }
  };

  const determineMetricTranslation = (metric: string) => {
    switch (metric) {
      case MetadataQualityMetric.ACCESS_RIGHTS_AVAILABILITY:
        return translations.metadataQualityPage.metric.accessRightsAvailability;
      case MetadataQualityMetric.ACCESS_RIGHTS_VOCABULARY_ALIGNMENT:
        return translations.metadataQualityPage.metric
          .accessRightsVocabularyAlignment;
      case MetadataQualityMetric.ACCESS_URL_STATUS_CODE:
        return translations.metadataQualityPage.metric.accessUrlStatusCode;
      case MetadataQualityMetric.BYTE_SIZE_AVAILABILITY:
        return translations.metadataQualityPage.metric.byteSizeAvailability;
      case MetadataQualityMetric.CATEGORY_AVAILABILITY:
        return translations.metadataQualityPage.metric.categoryAvailability;
      case MetadataQualityMetric.CONTACT_POINT_AVAILABILITY:
        return translations.metadataQualityPage.metric.contactPointAvailability;
      case MetadataQualityMetric.DATE_ISSUED_AVAILABILITY:
        return translations.metadataQualityPage.metric.dateIssuedAvailability;
      case MetadataQualityMetric.DATE_MODIFIED_AVAILABILITY:
        return translations.metadataQualityPage.metric.dateModifiedAvailability;
      case MetadataQualityMetric.DCAT_AP_COMPLIANCE:
        return translations.metadataQualityPage.metric.dcatApCompliance;
      case MetadataQualityMetric.DOWNLOAD_URL_AVAILABLITY:
        return translations.metadataQualityPage.metric.downloadUrlAvailability;
      case MetadataQualityMetric.DOWNLOAD_URL_STATUS_CODE:
        return translations.metadataQualityPage.metric.downloadUrlStatusCode;
      case MetadataQualityMetric.FORMAT_AVAILABILITY:
        return translations.metadataQualityPage.metric.formatAvailability;
      case MetadataQualityMetric.FORMAT_MATCH:
        return translations.metadataQualityPage.metric.formatMatch;
      case MetadataQualityMetric.FORMAT_MEDIA_TYPE_MACHINE_INTERPRETABLE:
        return translations.metadataQualityPage.metric
          .formatMediaTypeMachineInterpretable;
      case MetadataQualityMetric.FORMAT_MEDIA_TYPE_NON_PROPRIETARY:
        return translations.metadataQualityPage.metric
          .formatMediaTypeNonProprietary;
      case MetadataQualityMetric.FORMAT_MEDIA_TYPE_VOCABULARY_ALIGNMENT:
        return translations.metadataQualityPage.metric
          .formatMediaTypeVocabularyAlignment;
      case MetadataQualityMetric.KEYWORD_AVAILABILITY:
        return translations.metadataQualityPage.metric.keywordAvailability;
      case MetadataQualityMetric.KNOWN_LICENSE:
        return translations.metadataQualityPage.metric.knownLicense;
      case MetadataQualityMetric.LICENSE_AVAILABILITY:
        return translations.metadataQualityPage.metric.licenseAvailability;
      case MetadataQualityMetric.MEDIA_TYPE_AVAILABILITY:
        return translations.metadataQualityPage.metric.mediaTypeAvailability;
      case MetadataQualityMetric.OPEN_LICENSE:
        return translations.metadataQualityPage.metric.openLicense;
      case MetadataQualityMetric.PUBLISHER_AVAILABILITY:
        return translations.metadataQualityPage.metric.publisherAvailability;
      case MetadataQualityMetric.RIGHTS_AVAILABILITY:
        return translations.metadataQualityPage.metric.rightsAvailability;
      case MetadataQualityMetric.SPATIAL_AVAILABILITY:
        return translations.metadataQualityPage.metric.spatialAvailability;
      case MetadataQualityMetric.SYNTAX_VALID:
        return translations.metadataQualityPage.metric.syntaxValid;
      case MetadataQualityMetric.TEMPORAL_AVAILABILITY:
        return translations.metadataQualityPage.metric.temporalAvailability;

      default:
        return null;
    }
  };

  const determineMetricDescriptionTranslation = (metric: string) => {
    switch (metric) {
      case MetadataQualityMetric.ACCESS_RIGHTS_AVAILABILITY:
        return translations.metadataQualityPage.metricDescription
          .accessRightsAvailability;
      case MetadataQualityMetric.ACCESS_RIGHTS_VOCABULARY_ALIGNMENT:
        return translations.metadataQualityPage.metricDescription
          .accessRightsVocabularyAlignment;
      case MetadataQualityMetric.ACCESS_URL_STATUS_CODE:
        return translations.metadataQualityPage.metricDescription
          .accessUrlStatusCode;
      case MetadataQualityMetric.BYTE_SIZE_AVAILABILITY:
        return translations.metadataQualityPage.metricDescription
          .byteSizeAvailability;
      case MetadataQualityMetric.CATEGORY_AVAILABILITY:
        return translations.metadataQualityPage.metricDescription
          .categoryAvailability;
      case MetadataQualityMetric.CONTACT_POINT_AVAILABILITY:
        return translations.metadataQualityPage.metricDescription
          .contactPointAvailability;
      case MetadataQualityMetric.DATE_ISSUED_AVAILABILITY:
        return translations.metadataQualityPage.metricDescription
          .dateIssuedAvailability;
      case MetadataQualityMetric.DATE_MODIFIED_AVAILABILITY:
        return translations.metadataQualityPage.metricDescription
          .dateModifiedAvailability;
      case MetadataQualityMetric.DOWNLOAD_URL_AVAILABLITY:
        return translations.metadataQualityPage.metricDescription
          .downloadUrlAvailability;
      case MetadataQualityMetric.DOWNLOAD_URL_STATUS_CODE:
        return translations.metadataQualityPage.metricDescription
          .downloadUrlStatusCode;
      case MetadataQualityMetric.FORMAT_AVAILABILITY:
        return translations.metadataQualityPage.metricDescription
          .formatAvailability;
      case MetadataQualityMetric.FORMAT_MATCH:
        return translations.metadataQualityPage.metricDescription.formatMatch;
      case MetadataQualityMetric.FORMAT_MEDIA_TYPE_MACHINE_INTERPRETABLE:
        return translations.metadataQualityPage.metricDescription
          .formatMediaTypeMachineInterpretable;
      case MetadataQualityMetric.FORMAT_MEDIA_TYPE_NON_PROPRIETARY:
        return translations.metadataQualityPage.metricDescription
          .formatMediaTypeNonProprietary;
      case MetadataQualityMetric.FORMAT_MEDIA_TYPE_VOCABULARY_ALIGNMENT:
        return translations.metadataQualityPage.metricDescription
          .formatMediaTypeVocabularyAlignment;
      case MetadataQualityMetric.KEYWORD_AVAILABILITY:
        return translations.metadataQualityPage.metricDescription
          .keywordAvailability;
      case MetadataQualityMetric.KNOWN_LICENSE:
        return translations.metadataQualityPage.metricDescription.knownLicense;
      case MetadataQualityMetric.LICENSE_AVAILABILITY:
        return translations.metadataQualityPage.metricDescription
          .licenseAvailability;
      case MetadataQualityMetric.MEDIA_TYPE_AVAILABILITY:
        return translations.metadataQualityPage.metricDescription
          .mediaTypeAvailability;
      case MetadataQualityMetric.OPEN_LICENSE:
        return translations.metadataQualityPage.metricDescription.openLicense;
      case MetadataQualityMetric.PUBLISHER_AVAILABILITY:
        return translations.metadataQualityPage.metricDescription
          .publisherAvailability;
      case MetadataQualityMetric.RIGHTS_AVAILABILITY:
        return translations.metadataQualityPage.metricDescription
          .rightsAvailability;
      case MetadataQualityMetric.SPATIAL_AVAILABILITY:
        return translations.metadataQualityPage.metricDescription
          .spatialAvailability;
      case MetadataQualityMetric.SYNTAX_VALID:
        return translations.metadataQualityPage.metricDescription.syntaxValid;
      case MetadataQualityMetric.TEMPORAL_AVAILABILITY:
        return translations.metadataQualityPage.metricDescription
          .temporalAvailability;

      default:
        return null;
    }
  };

  const datasetScore = datasetScores
    ? Object.values(datasetScores.scores)[0]
    : null;

  return (
    <SC.DatasetPage className='container'>
      <SC.Banner>
        <SC.BetaRibbon>BETA</SC.BetaRibbon>
        <h1>
          {translations.metadataQualityPage.organizationDatasetPageSubtitle}
        </h1>
        <div>
          <SC.DatasetIcon />
          <SC.Title>{translate(dataset?.title)}</SC.Title>
          <SC.BannerRating>
            {determineRatingIcon(datasetScore?.dataset)}
            <p>{calculateRatingPercentage(datasetScore?.dataset)}%</p>
          </SC.BannerRating>
        </div>
      </SC.Banner>
      <SC.DatasetLink>
        <Link to={`${PATHNAME_DATASET_DETAILS}/${datasetId}`} as={RouteLink}>
          {translations.metadataQualityPage.goToDataset}
        </Link>
      </SC.DatasetLink>
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
            {datasetScore?.dataset.dimensions?.map(dimensionScore => (
              <Fragment key={dimensionScore.id}>
                <tr className='section-row'>
                  <td>
                    <div>
                      <SC.DimensionContainer>
                        <p>
                          {determineDimensionTranslation(dimensionScore.id)}
                        </p>
                        <div
                          title={determineDimensionDescriptionTranslation(
                            dimensionScore.id
                          )}
                          data-for={`${dimensionScore.id}_tooltip`}
                        >
                          <SC.QuestionIcon />
                        </div>
                      </SC.DimensionContainer>
                      <div>
                        <span>
                          {calculateRatingPercentage(dimensionScore)}%
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
                {dimensionScore.metrics.map(
                  ({
                    id: metricId,
                    score: metricScore,
                    max_score: metricMaxScore
                  }) => (
                    <tr key={metricId}>
                      <ExpansionPanel
                        as='td'
                        id={`expansion-metric-${metricId}`}
                        expansionIndicator={{
                          expand: <ExpansionIndicatorDefault />,
                          collapse: (
                            <ExpansionIndicatorDefault
                              isExpanded
                              aria-expanded='true'
                              aria-controls={`expansion-metric-${metricId}`}
                            />
                          )
                        }}
                      >
                        <ExpansionPanelHead>
                          <span>
                            {metricScore > 0 ? (
                              <SC.CheckIcon />
                            ) : (
                              <SC.CrossIcon />
                            )}
                          </span>
                          <p>
                            {determineMetricTranslation(metricId) ?? metricId}
                          </p>
                        </ExpansionPanelHead>
                        <ExpansionPanelBody>
                          <SC.MetricDescription>
                            {determineMetricDescriptionTranslation(metricId)}
                          </SC.MetricDescription>
                          <span>
                            {translations.formatString(
                              translations.metadataQualityPage.metricMaxScore,
                              { metricMaxScore }
                            )}
                          </span>
                        </ExpansionPanelBody>
                      </ExpansionPanel>
                    </tr>
                  )
                )}
              </Fragment>
            ))}
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
            <Link href={PATHNAME_GUIDANCE_METADATA}>
              {translations.metadataQualityPage.whatIsMetadataQualityFaqLink}
            </Link>
          </SC.Question>
        </SC.FrequentlyAskedQuestions>
      </SC.Section>
    </SC.DatasetPage>
  );
};

export default compose<FC>(
  memo,
  withDataset,
  withDatasetScores,
  withOrganization,
  withErrorBoundary(ErrorPage)
)(DatasetPage);
