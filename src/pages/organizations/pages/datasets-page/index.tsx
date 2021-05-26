import React, { memo, FC, useState, useLayoutEffect } from 'react';
import { compose } from 'redux';
import Link from '@fellesdatakatalog/link';
import type { RouteComponentProps } from 'react-router-dom';

import { getConfig } from '../../../../config';

import withAssessment, {
  Props as AssessmentProps
} from '../../../../components/with-assessment';
import withAssessments, {
  Props as AssessmentsProps
} from '../../../../components/with-assessments';
import withOrganization, {
  Props as OrganizationProps
} from '../../../../components/with-organization';
import withErrorBoundary from '../../../../components/with-error-boundary';
import ErrorPage from '../../../../components/error-page';

import { getTranslateText as translate } from '../../../../lib/translateText';
import translations from '../../../../lib/localization';

import { PATHNAME_GUIDANCE_METADATA } from '../../../../constants/constants';

import ExpandIcon from '../../../../images/icon-expand-text-sm.svg';

import SC from './styled';

import type { Rating } from '../../../../types';
import { RatingCategory, DimensionType } from '../../../../types/enums';

interface RouteParams {
  organizationId: string;
}

interface Props
  extends AssessmentProps,
    AssessmentsProps,
    OrganizationProps,
    RouteComponentProps<RouteParams> {}

const DatasetsPage: FC<Props> = ({
  organization,
  assessments,
  catalogRating,
  totalAssessments,
  assessmentsPage,
  assessmentPageSize,
  hasMoreAssessments,
  assessmentActions: { getCatalogRatingRequested: getCatalogRating },
  assessmentsActions: {
    getPagedAssessmentsRequested: getAssessments,
    loadMoreAssessmentsRequested: loadMoreAssessments
  },
  organizationActions: { getOrganizationRequested: getOrganization },
  history: { push },
  match: {
    url,
    params: { organizationId }
  }
}) => {
  const [assessmentsRequested, setAssessmentsRequested] = useState(false);

  const isTransportportal = getConfig().themeNap;

  const loadMoreDatasets = () =>
    loadMoreAssessments(
      organizationId,
      'dataset',
      isTransportportal ? 'NAP' : 'FDK',
      assessmentsPage + 1
    );

  useLayoutEffect(() => {
    if (organization?.organizationId !== organizationId) {
      getOrganization(organizationId);
    }
  }, []);

  useLayoutEffect(() => {
    if (!assessmentsRequested) {
      getAssessments(
        organizationId,
        'dataset',
        isTransportportal ? 'NAP' : 'FDK',
        0
      );

      getCatalogRating(
        organizationId,
        'dataset',
        isTransportportal ? 'NAP' : 'FDK'
      );

      setAssessmentsRequested(true);
    }
  });

  const calculateRatingPercentage = (
    r: Pick<Rating, 'score' | 'maxScore'> | null | undefined
  ) => {
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

  return (
    <SC.DatasetsPage className='container'>
      <SC.BetaRibbon>BETA</SC.BetaRibbon>
      <SC.Title>
        {translations.formatString(
          translations.metadataQualityPage.organizationDatasetCatalogPageTitle,
          {
            organizationName:
              translate(organization?.prefLabel) || organization?.name
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
              <th>{translations.metadataQualityPage.criteria.accessibility}</th>
              <th>{translations.metadataQualityPage.criteria.findability}</th>
              <th>
                {translations.metadataQualityPage.criteria.interoperability}
              </th>
              <th>{translations.metadataQualityPage.criteria.readability}</th>
              <th>{translations.metadataQualityPage.criteria.reusability}</th>
            </tr>
          </SC.TableHead>
          <SC.TableBody>
            {assessments.map(assessment => (
              <tr
                key={assessment.id}
                onClick={() => push(`${url}/${assessment.id}`)}
              >
                <td>{translate(assessment.entity?.title)}</td>
                <td>
                  <SC.MetadataCellContents>
                    {determineRatingIcon(assessment?.rating)}
                    <span>
                      {calculateRatingPercentage(assessment?.rating)}%
                    </span>
                  </SC.MetadataCellContents>
                </td>
                <td>
                  {calculateRatingPercentage(
                    assessment?.dimensions?.find(
                      ({ type }) => type === DimensionType.ACCESSIBILITY
                    )?.rating
                  )}
                  %
                </td>
                <td>
                  {calculateRatingPercentage(
                    assessment?.dimensions?.find(
                      ({ type }) => type === DimensionType.FINDABILITY
                    )?.rating
                  )}
                  %
                </td>
                <td>
                  {calculateRatingPercentage(
                    assessment?.dimensions?.find(
                      ({ type }) => type === DimensionType.INTEROPERABILITY
                    )?.rating
                  )}
                  %
                </td>
                <td>
                  {calculateRatingPercentage(
                    assessment?.dimensions?.find(
                      ({ type }) => type === DimensionType.READABILITY
                    )?.rating
                  )}
                  %
                </td>
                <td>
                  {calculateRatingPercentage(
                    assessment?.dimensions?.find(
                      ({ type }) => type === DimensionType.REUSABILITY
                    )?.rating
                  )}
                  %
                </td>
              </tr>
            ))}
          </SC.TableBody>
        </SC.Table>
        {hasMoreAssessments && (
          <SC.LoadMoreButton onClick={loadMoreDatasets}>
            <ExpandIcon />
            <span>
              {translations.formatString(
                translations.metadataQualityPage.loadMoreDatasets,
                {
                  count:
                    totalAssessments -
                    (assessmentsPage + 1) * assessmentPageSize
                }
              )}
            </span>
          </SC.LoadMoreButton>
        )}
        <SC.RatingSummary>
          <div>
            {translations.metadataQualityPage.averageRatingForOrganization}
          </div>
          <SC.MetadataCellContents>
            {determineRatingIcon(catalogRating)}
            <span>{calculateRatingPercentage(catalogRating)}%</span>
          </SC.MetadataCellContents>
          {[
            DimensionType.ACCESSIBILITY,
            DimensionType.FINDABILITY,
            DimensionType.INTEROPERABILITY,
            DimensionType.READABILITY,
            DimensionType.REUSABILITY
          ].map(dimension => (
            <div key={dimension}>
              {`${calculateRatingPercentage(
                catalogRating?.dimensionsRating?.[dimension]
              )}%`}
            </div>
          ))}
        </SC.RatingSummary>
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
  withAssessment,
  withAssessments,
  withOrganization,
  withErrorBoundary(ErrorPage)
)(DatasetsPage);
