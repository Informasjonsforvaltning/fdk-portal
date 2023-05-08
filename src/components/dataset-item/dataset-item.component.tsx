import React, { FC } from 'react';
import { Link as RouteLink } from 'react-router-dom';

import localization from '../../lib/localization';
import { getTranslateText as translate } from '../../lib/translateText';
import { patchSearchQuery } from '../../lib/addOrReplaceUrlParam';

import { RoundedTag } from '../rounded-tag/rounded-tag.component';
import {
  SearchHit,
  SearchHitFormats,
  SearchHitThemes,
  SearchHitAccessRights,
  SearchHitOpenData
} from '../search-hit/search-hit';

import { isLosTheme, isEuTheme } from '../../utils/common';

import PublicIconBase from '../../images/icon-access-open-md-v2.svg';

import type { Dataset, MediaTypeOrExtent } from '../../types';
import {
  MediaTypeOrExtentType,
  SearchTypes,
  SpecializedDatasetType
} from '../../types/enums';

import SC from './dataset-item.styled';

interface Props {
  dataset: Partial<Dataset>;
}

export const DatasetItem: FC<Props> = ({
  dataset: {
    id,
    title,
    description,
    publisher,
    losTheme: losThemes,
    theme: euThemes,
    distribution = [],
    accessRights,
    provenance,
    specializedType,
    datasetsInSeries,
    inSeries
  }
}) => {
  const isDatasetOpen = (ar: any, dist: any): boolean =>
    ar?.code === 'PUBLIC' &&
    (dist || []).filter((item: any) => !!item.openLicense).length > 0;

  const renderAccessRights = (accessRight: any) => {
    if (accessRight?.code === 'PUBLIC') {
      return (
        <RoundedTag to={patchSearchQuery('accessrights', 'PUBLIC')}>
          <PublicIconBase />
          <span>
            {localization.dataset.accessRights.authorityCode.publicDetailsLabel}
          </span>
        </RoundedTag>
      );
    }
    return null;
  };

  const formats = distribution?.reduce(
    (previous, { fdkFormat = [] }) => [...previous, ...fdkFormat],
    [] as MediaTypeOrExtent[]
  );

  const themes = [...(losThemes ?? []), ...(euThemes ?? [])];

  const subtitle = () => {
    if (specializedType === SpecializedDatasetType.DATASET_SERIES) {
      let containsText = localization.datasetsInSeriesEmpty;
      const count = datasetsInSeries?.length ?? 0;
      if (count > 0) {
        containsText = localization.formatString(
          count === 1
            ? localization.datasetsInSeriesSingular
            : localization.datasetsInSeries,
          count
        );
      }
      return (
        <SC.Subtitle>
          {localization.datasetSeriesLabel}
          <SC.Dot>•</SC.Dot>
          {containsText}
        </SC.Subtitle>
      );
    }
    if (inSeries?.title) {
      const containedInText = localization.formatString(
        localization.datasetIsInSeries,
        inSeries.title
      );
      return (
        <SC.Subtitle>
          {localization.datasetLabel}
          <SC.Dot>•</SC.Dot>
          {containedInText}
        </SC.Subtitle>
      );
    }
    return localization.datasetLabel;
  };

  return (
    <SearchHit
      id={id}
      type={SearchTypes.dataset}
      title={title}
      subtitle={subtitle()}
      publisher={publisher}
      description={description}
      isAuthoritative={provenance?.code === 'NASJONAL'}
    >
      {isDatasetOpen(accessRights, distribution) && (
        <SearchHitOpenData>
          <div title={localization.openDataTooltip}>
            <RoundedTag to={patchSearchQuery('opendata', 'true')}>
              <PublicIconBase />
              <span>{localization.openData}</span>
            </RoundedTag>
          </div>
        </SearchHitOpenData>
      )}

      {!isDatasetOpen(accessRights, distribution) && (
        <SearchHitAccessRights>
          <div title={localization.publicDatasetTooltip}>
            {renderAccessRights(accessRights)}
          </div>
        </SearchHitAccessRights>
      )}

      <SearchHitThemes>
        {themes.map(theme => {
          if (isLosTheme(theme)) {
            const { uri, name, losPaths: [losPath] = [] } = theme;
            return (
              <RoundedTag key={uri} to={patchSearchQuery('losTheme', losPath)}>
                <span>{translate(name)}</span>
              </RoundedTag>
            );
          }

          if (isEuTheme(theme)) {
            const {
              id: themeId,
              title: themeTitle,
              label: themeLabel,
              code
            } = theme;
            return (
              <RoundedTag key={themeId} to={patchSearchQuery('theme', code)}>
                <span>
                  {themeTitle ? translate(themeTitle) : translate(themeLabel)}
                </span>
              </RoundedTag>
            );
          }

          return null;
        })}
      </SearchHitThemes>

      <SearchHitFormats>
        {formats
          .filter(
            format =>
              format.name && format.type !== MediaTypeOrExtentType.UNKNOWN
          )
          .sort((a, b) => `${a.name}`.localeCompare(`${b.name}`))
          .map((format, index) => (
            <RouteLink
              key={`format-${format.name}-${index}`}
              to={patchSearchQuery('format', `${format.type} ${format.name}`)}
            >
              <span>{`${format.name}`}</span>
            </RouteLink>
          ))}
      </SearchHitFormats>
    </SearchHit>
  );
};

export default DatasetItem;
