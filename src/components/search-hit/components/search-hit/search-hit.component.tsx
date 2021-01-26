import React, { Children, FC, isValidElement } from 'react';

import SC from './styled';
import { Publisher, TextLanguage } from '../../../../types';
import { SearchTypes } from '../../../../types/enums';
import { SearchHitHead } from '../search-hit-head/search-hit-head.component';
import { getTranslateText } from '../../../../lib/translateText';
import localization from '../../../../lib/localization';
import { truncateTextWithEllipsis } from '../../../../lib/stringUtils';
import SearchHitAccessRights from '../search-hit-access-rigths/search-hit-access-rights.component';
import SearchHitOpenData from '../search-hit-open-data/search-hit-open-data.component';
import SearchHitThemes from '../search-hit-themes/searh-hit-themes.component';
import SearchHitFormats from '../search-hit-formats/search-hit-formats';
import SearchHitData from '../search-hit-data/search-hit-data.component';

interface Props {
  id?: string;
  type: SearchTypes;
  title?: Partial<TextLanguage>;
  description?: Partial<TextLanguage> | null;
  publisher?: Partial<Publisher>;
  isAuthoritative?: boolean;
  beta?: boolean;
}

function getPublisherLabel(type: SearchTypes) {
  switch (type) {
    case SearchTypes.dataset:
      return localization.search_hit.owned;
    case SearchTypes.dataservice:
      return `${localization.provider}:`;
    case SearchTypes.concept:
      return `${localization.responsible}:`;
    case SearchTypes.informationModel:
      return `${localization.responsible}:`;
    case SearchTypes.publicService:
      return `${localization.provider}:`;
    default:
      return '';
  }
}

export const SearchHit: FC<Props> = ({
  id,
  type,
  title,
  description,
  publisher,
  isAuthoritative = false,
  beta = false,
  children
}) => {
  const { prefLabel, name } = publisher || {};

  const renderSearchHitOpenData = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SearchHitOpenData ? (
        <SC.OpenData>{child}</SC.OpenData>
      ) : null
    )?.shift();

  const renderSearchHitAccessRights = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SearchHitAccessRights ? (
        <SC.AccessRight>{child}</SC.AccessRight>
      ) : null
    )?.shift();

  const renderSearchHitThemes = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SearchHitThemes ? (
        <SC.Theme>{child}</SC.Theme>
      ) : null
    )?.shift();

  const renderSearchHitFormats = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SearchHitFormats ? (
        <SC.Format>{child}</SC.Format>
      ) : null
    )?.shift();

  const renderSearchHitData = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SearchHitData ? (
        <SC.Data>{child}</SC.Data>
      ) : null
    )?.shift();

  return (
    <SC.SearchHit>
      {beta && <SC.BetaRibbon>{localization.dataset.sample}</SC.BetaRibbon>}
      <SearchHitHead
        id={id}
        type={type}
        title={title}
        isAuthoritative={isAuthoritative}
      />
      {(prefLabel || name) && (
        <SC.Publisher>
          <span>{getPublisherLabel(type)}&nbsp;</span>
          <span>{getTranslateText(prefLabel) || name}</span>
        </SC.Publisher>
      )}
      {renderSearchHitOpenData()}
      {renderSearchHitAccessRights()}
      {description && (
        <SC.Description>
          {truncateTextWithEllipsis(getTranslateText(description), 220)}
        </SC.Description>
      )}
      {renderSearchHitData()}
      {renderSearchHitThemes()}
      {renderSearchHitFormats()}
    </SC.SearchHit>
  );
};
