import React, { memo, FC, useState, useLayoutEffect } from 'react';
import { compose } from 'redux';
import type { RouteComponentProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Link from '@fellesdatakatalog/link';

import withOrganization, {
  Props as OrganizationProps
} from '../../../../components/with-organization';

import { getTranslateText as translate } from '../../../../lib/translateText';
import translations from '../../../../lib/localization';

import {
  IllustrationWithCount,
  SC as StatisticsRegularSC,
  StatisticsRegular
} from '../../../../components/statistics-regular/statistics-regular';

import ExpandIcon from '../../../../images/icon-expand-text-sm.svg';

import SC from './styled';

import { themeFDK as theme } from '../../../../app/theme';

import { Entity, RatingCategory, DimensionType } from '../../../../types/enums';
import { Rating } from '../../../../types';

interface RouteParams {
  organizationId: string;
}

interface Props extends OrganizationProps, RouteComponentProps<RouteParams> {}

const articleIds: { [key: string]: string } = {
  nb: '701a4b80-d830-4aa5-be63-20422e3d8d64',
  nn: '5892cae9-2b31-4f52-b0a6-da87092924bf',
  en: 'cf2a2b6d-88bb-4f3a-bbfc-4114e2841479'
};

const DatasetsPage: FC<Props> = ({
  organization,
  datasets,
  rating,
  datasetsPage,
  hasMoreDatasets,
  organizationActions: {
    getOrganizationRequested: getOrganization,
    getOrganizationDatasetsRequested: getOrganizationDatasets,
    loadMoreOrganizationDatasetsRequested: loadMoreOrganizationDatasets
  },
  history: { push },
  match: {
    url,
    params: { organizationId }
  }
}) => {
  const [datasetsRequested, setDatasetsRequested] = useState(false);

  useLayoutEffect(() => {
    if (organization?.organizationId !== organizationId) {
      getOrganization(organizationId);
    }
  }, []);

  useLayoutEffect(() => {
    if (organization && !datasetsRequested) {
      getOrganizationDatasets(organization.organizationId);
      setDatasetsRequested(true);
    }
  }, [organization]);

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
    <SC.DatasetsPage className="container">
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
        <ThemeProvider theme={theme.extendedColors[Entity.DATASET]}>
          <SC.SummaryBoxes>
            <SC.Box>
              <StatisticsRegular to="">
                <StatisticsRegularSC.StatisticsRegular.Label>
                  <IllustrationWithCount
                    icon={determineRatingIcon(rating)}
                    percentage={calculateRatingPercentage(rating)}
                  />
                  {determineRatingTranslation()}
                </StatisticsRegularSC.StatisticsRegular.Label>
              </StatisticsRegular>
            </SC.Box>
            <SC.Box>
              <StatisticsRegular to="">
                <IllustrationWithCount count={rating?.satisfiedCriteria ?? 0} />
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
              <th>{translations.metadataQualityPage.datasetTitle}</th>
              <th>{translations.metadataQualityPage.metadataQuality}</th>
              <th>{translations.metadataQualityPage.criteria.findability}</th>
              <th>{translations.metadataQualityPage.criteria.availability}</th>
            </tr>
          </SC.TableHead>
          <SC.TableBody>
            {datasets.map(({ id, title, assessment }) => (
              <tr key={id} onClick={() => push(`${url}/${id}`)}>
                <td>{translate(title)}</td>
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
                      ({ type }) => type === DimensionType.FINDABILITY
                    )?.rating
                  )}
                  %
                </td>
                <td>
                  {calculateRatingPercentage(
                    assessment?.dimensions?.find(
                      ({ type }) => type === DimensionType.ACCESSIBILITY
                    )?.rating
                  )}
                  %
                </td>
              </tr>
            ))}
          </SC.TableBody>
        </SC.Table>
        {hasMoreDatasets && (
          <SC.LoadMoreButton
            onClick={() =>
              loadMoreOrganizationDatasets(organizationId, datasetsPage + 1)
            }
          >
            <ExpandIcon />
            <span>{translations.metadataQualityPage.loadMoreDatasets}</span>
          </SC.LoadMoreButton>
        )}
      </SC.Section>
      <SC.Section>
        <Link href={`/news/${articleIds[translations.getLanguage()]}`}>
          {translations.metadataQualityPage.learnMoreAboutMetadataQuality}
        </Link>
      </SC.Section>
    </SC.DatasetsPage>
  );
};

export default compose<FC>(memo, withOrganization)(DatasetsPage);
