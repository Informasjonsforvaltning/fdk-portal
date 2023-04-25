import React, { FC, memo } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

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
import { setMultiselectFilterValue } from '../../pages/search-page/search-location-helper';

interface Props extends RouteComponentProps {
  dataset: Partial<Dataset>;
}

const DatasetItemComponent: FC<Props> = ({
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
  },
  history
}) => {
  const handleDatasetFilterAccessRights = (value: string) => {
    if (value === 'OPEN_DATA') {
      setMultiselectFilterValue(history, location, 'opendata', 'true', true);
    } else {
      setMultiselectFilterValue(history, location, 'accessrights', value, true);
    }
  };

  const handleFilterFormat = (format: MediaTypeOrExtent) => {
    setMultiselectFilterValue(
      history,
      location,
      'format',
      `${format.type} ${format.code}`,
      true
    );
  };

  const isDatasetOpen = (ar: any, dist: any): boolean =>
    ar?.code === 'PUBLIC' &&
    (dist || []).filter((item: any) => !!item.openLicense).length > 0;

  const renderAccessRights = (accessRight: any) => {
    if (accessRight?.code === 'PUBLIC') {
      return (
        <SC.FilterButton
          type='button'
          onClick={() => handleDatasetFilterAccessRights('PUBLIC')}
        >
          <RoundedTag>
            <PublicIconBase />
            <span>
              {
                localization.dataset.accessRights.authorityCode
                  .publicDetailsLabel
              }
            </span>
          </RoundedTag>
        </SC.FilterButton>
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
            <SC.FilterButton
              type='button'
              onClick={() => handleDatasetFilterAccessRights('OPEN_DATA')}
            >
              <RoundedTag>
                <PublicIconBase />
                <span>{localization.openData}</span>
              </RoundedTag>
            </SC.FilterButton>
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
            <SC.FilterButton
              type='button'
              onClick={() => handleFilterFormat(format)}
              title={`${format.name} format`}
            >
              <span
                key={`format-${format.name}-${index}`}
              >{`${format.name}`}</span>
            </SC.FilterButton>
          ))}
      </SearchHitFormats>
    </SearchHit>
  );
};

export const DatasetItem = memo(withRouter(DatasetItemComponent));
export default DatasetItem;
