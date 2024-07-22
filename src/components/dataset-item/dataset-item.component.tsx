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

import {
  getLastWordAfterSlash,
  isEuTheme,
  isLosNode,
  parseFormats
} from '../../utils/common';

import type { SearchObject } from '../../types';
import {
  MediaTypeOrExtentType,
  SearchTypes,
  SpecializedDatasetType
} from '../../types/enums';

import SC from './dataset-item.styled';

interface Props {
  dataset: Partial<SearchObject>;
}

export const DatasetItem: FC<Props> = ({
  dataset: {
    id,
    title,
    description,
    organization,
    losTheme: losThemes,
    dataTheme: euThemes,
    fdkFormatPrefixed,
    accessRights,
    specializedType,
    isOpenData,
    isAuthoritative
  }
}) => {
  const parsedFormats = parseFormats(fdkFormatPrefixed);

  const renderAccessRights = (accessRight: any) => {
    if (accessRight?.code === 'PUBLIC') {
      return (
        <RoundedTag to={patchSearchQuery('accessrights', 'PUBLIC')}>
          <span>
            {localization.dataset.accessRights.authorityCode.publicDetailsLabel}
          </span>
        </RoundedTag>
      );
    }
    return null;
  };

  const themes = [...(losThemes ?? []), ...(euThemes ?? [])];

  const subtitle = () => {
    if (specializedType === SpecializedDatasetType.DATASET_SERIES) {
      const containsText = localization.datasetsInSeriesEmpty;

      return (
        <SC.Subtitle>
          {localization.datasetSeriesLabel}
          <SC.Dot>•</SC.Dot>
          {containsText}
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
      publisher={organization}
      description={description}
      isAuthoritative={isAuthoritative}
    >
      {isOpenData && (
        <SearchHitOpenData>
          <div title={localization.openDataTooltip}>
            <RoundedTag to={patchSearchQuery('opendata', 'true')}>
              <span>{localization.openData}</span>
            </RoundedTag>
          </div>
        </SearchHitOpenData>
      )}

      {!isOpenData && (
        <SearchHitAccessRights>
          <div title={localization.publicDatasetTooltip}>
            {renderAccessRights(accessRights)}
          </div>
        </SearchHitAccessRights>
      )}

      <SearchHitThemes>
        {themes.map(theme => {
          if (isLosNode(theme)) {
            const { name, losPaths: [losPath] = [] } = theme;
            return (
              <RoundedTag
                key={`losTheme-${name}`}
                to={patchSearchQuery('losTheme', losPath)}
              >
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
        {parsedFormats
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
              <span>
                {format.name ? `${getLastWordAfterSlash(format?.name)}` : ''}
              </span>
            </RouteLink>
          ))}
      </SearchHitFormats>
    </SearchHit>
  );
};

export default DatasetItem;
