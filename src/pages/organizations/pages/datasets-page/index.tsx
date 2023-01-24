import React, { memo, FC, useLayoutEffect } from 'react';
import { compose } from 'redux';
import Link from '@fellesdatakatalog/link';
import type { RouteComponentProps } from 'react-router-dom';

// import { getConfig } from '../../../../config';
import withDatasets, {
  Props as DatasetsProps
} from '../../../../components/with-datasets';
import withDatasetScores, {
  Props as DatasetScoresProps
} from '../../../../components/with-dataset-scores';
import withOrganization, {
  Props as OrganizationProps
} from '../../../../components/with-organization';
import withErrorBoundary from '../../../../components/with-error-boundary';
import ErrorPage from '../../../../components/error-page';

import { getTranslateText as translate } from '../../../../lib/translateText';
import translations from '../../../../lib/localization';

import { PATHNAME_GUIDANCE_METADATA } from '../../../../constants/constants';

import SC from './styled';
import {
  Dataset,
  DatasetScore,
  MetadataQualityAggregationScore,
  MetadataQualityDimensionScore,
  MetadataQualityScore
} from '../../../../types';

import {
  MetadataQualityDimension,
  MetadataQualityRatingCategory
} from '../../../../types/enums';
import { mapScoreToRatingCategory } from '../../../../utils/metadata-quality';

interface RouteParams {
  organizationId: string;
}

interface Props
  extends OrganizationProps,
    DatasetsProps,
    DatasetScoresProps,
    RouteComponentProps<RouteParams> {}

const determineAggregationRatingIcon = (
  score: MetadataQualityAggregationScore[] | null | undefined
) => {
  const calcScore: number =
    score?.reduce((prev, curr) => prev + curr.score, 0) ?? 0;

  switch (mapScoreToRatingCategory(calcScore)) {
    case MetadataQualityRatingCategory.EXCELLENT:
      return <SC.ExcellentQualityIcon />;
    case MetadataQualityRatingCategory.GOOD:
      return <SC.GoodQualityIcon />;
    case MetadataQualityRatingCategory.SUFFICIENT:
      return <SC.SufficientQualityIcon />;
    case MetadataQualityRatingCategory.POOR:
    default:
      return <SC.PoorQualityIcon />;
  }
};

export const determineRatingIcon = (
  score: MetadataQualityScore | null | undefined
) => {
  const calcScore: number = score?.score ?? 0;
  if (calcScore >= 351) {
    return <SC.ExcellentQualityIcon />;
  }
  if (calcScore >= 221) {
    return <SC.GoodQualityIcon />;
  }
  if (calcScore >= 121) {
    return <SC.SufficientQualityIcon />;
  }
  return <SC.PoorQualityIcon />;
};

const calculateAggregationRatingPercentage = (
  score: MetadataQualityAggregationScore[] | undefined
) => {
  const totals = score?.reduce(
    (prev, curr) => [prev[0] + curr.score, prev[1] + curr.max_score],
    [0, 0]
  ) ?? [0, 0];
  const [calcScore, calcMaxScore] = totals;

  return calcMaxScore === 0 ? 0 : Math.round((calcScore / calcMaxScore) * 100);
};

export const calculateRatingPercentage = (
  score:
    | MetadataQualityScore
    | MetadataQualityDimensionScore
    | MetadataQualityAggregationScore
    | undefined
) => {
  const calcScore = score?.score ?? 0;
  const calcMaxScore = score?.max_score ?? 0;

  return calcMaxScore === 0 ? 0 : Math.round((calcScore / calcMaxScore) * 100);
};

const DatasetsPage: FC<Props> = ({
  organization,
  organizationActions: { getOrganizationRequested: getOrganization },
  datasets,
  datasetsActions: { getDatasetsRequested: getDatasets },
  datasetScores,
  datasetScoresActions: { getDatasetScoresRequested: getDatasetScores },
  match: {
    url,
    params: { organizationId }
  },
  history: { push }
}) => {
  // const isTransportportal = getConfig().themeNap;

  useLayoutEffect(() => {
    if (organization?.organizationId !== organizationId) {
      getOrganization(organizationId);
    }
  }, []);

  useLayoutEffect(() => {
    if (
      organization &&
      organization.organizationId !== datasets?.[0]?.publisher.organizationId
    ) {
      getDatasets({ orgPath: organization.orgPath, size: 10000 });
    }
  }, [organization?.organizationId]);

  useLayoutEffect(() => {
    if (
      datasets &&
      datasets.length > 0 &&
      datasets[0].uri !== datasetScores?.scores[0]?.dataset.id
    ) {
      getDatasetScores({ datasets: datasets.map(dataset => dataset.uri) });
    }
  }, [datasets?.[0]?.id]);

  const scores: Map<Dataset, DatasetScore> = new Map(
    Object.values(datasetScores?.scores ?? [])
      .filter(score =>
        datasets.find(dataset => dataset.uri === score.dataset.id)
      )
      .map(score => [
        datasets.find(dataset => dataset.uri === score.dataset.id)!,
        score
      ])
  );

  return (
    <SC.DatasetsPage className='container'>
      <SC.BetaRibbon>BETA</SC.BetaRibbon>
      <SC.Title>
        {translations.formatString(
          translations.metadataQualityPage.organizationDatasetCatalogPageTitle,
          {
            organizationName:
              translate(organization?.prefLabel) ||
              translate(organization?.name) ||
              ''
          }
        )}
      </SC.Title>
      <SC.Subtitle>
        {
          translations.metadataQualityPage
            .organizationDatasetCatalogPageSubtitle
        }
      </SC.Subtitle>
      <SC.Section>
        <SC.Table>
          <SC.TableHead>
            <tr>
              <th>{translations.metadataQualityPage.datasetTitle}</th>
              <th>{translations.metadataQualityPage.metadataQuality}</th>
              <th>
                {translations.metadataQualityPage.dimension.accessibility}
              </th>
              <th>{translations.metadataQualityPage.dimension.findability}</th>
              <th>
                {translations.metadataQualityPage.dimension.interoperability}
              </th>
              <th>
                {translations.metadataQualityPage.dimension.contextuality}
              </th>
              <th>{translations.metadataQualityPage.dimension.reusability}</th>
            </tr>
          </SC.TableHead>
          {datasetScores && (
            <SC.TableBody>
              {Array.from(scores.entries()).map(([dataset, score]) => (
                <tr
                  key={dataset.id}
                  onClick={() => push(`${url}/${dataset.id}`)}
                >
                  <td>{translate(dataset.title)}</td>
                  <td>
                    <SC.MetadataCellContents>
                      {determineRatingIcon(score.dataset)}
                      <span>{calculateRatingPercentage(score.dataset)}%</span>
                    </SC.MetadataCellContents>
                  </td>
                  <td>
                    {calculateRatingPercentage(
                      score.dataset?.dimensions?.find(
                        ({ id }) =>
                          id === MetadataQualityDimension.ACCESSIBILITY
                      )
                    )}
                    %
                  </td>
                  <td>
                    {calculateRatingPercentage(
                      score.dataset?.dimensions?.find(
                        ({ id }) => id === MetadataQualityDimension.FINDABILITY
                      )
                    )}
                    %
                  </td>
                  <td>
                    {calculateRatingPercentage(
                      score.dataset?.dimensions?.find(
                        ({ id }) =>
                          id === MetadataQualityDimension.INTEROPERABILITY
                      )
                    )}
                    %
                  </td>
                  <td>
                    {calculateRatingPercentage(
                      score.dataset?.dimensions?.find(
                        ({ id }) =>
                          id === MetadataQualityDimension.CONTEXTUALITY
                      )
                    )}
                    %
                  </td>
                  <td>
                    {calculateRatingPercentage(
                      score.dataset?.dimensions?.find(
                        ({ id }) => id === MetadataQualityDimension.REUSABILITY
                      )
                    )}
                    %
                  </td>
                </tr>
              ))}
            </SC.TableBody>
          )}
        </SC.Table>
        {datasetScores?.aggregations && (
          <SC.RatingSummary>
            <div>
              {translations.metadataQualityPage.averageRatingForOrganization}
            </div>
            <SC.MetadataCellContents>
              {determineAggregationRatingIcon(datasetScores?.aggregations)}
              <span>
                {calculateAggregationRatingPercentage(
                  datasetScores?.aggregations
                )}
                %
              </span>
            </SC.MetadataCellContents>
            {[
              MetadataQualityDimension.ACCESSIBILITY,
              MetadataQualityDimension.FINDABILITY,
              MetadataQualityDimension.INTEROPERABILITY,
              MetadataQualityDimension.CONTEXTUALITY,
              MetadataQualityDimension.REUSABILITY
            ].map(dimension => (
              <div key={dimension}>
                {`${calculateRatingPercentage(
                  datasetScores?.aggregations.find(({ id }) => id === dimension)
                )}%`}
              </div>
            ))}
          </SC.RatingSummary>
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
    </SC.DatasetsPage>
  );
};

export default compose<FC>(
  memo,
  withOrganization,
  withDatasets,
  withDatasetScores,
  withErrorBoundary(ErrorPage)
)(DatasetsPage);
