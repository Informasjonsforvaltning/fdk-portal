import React, { Children, FC, isValidElement } from 'react';

import _ from 'lodash';
import SC from './styled';
import type { Organization, TextLanguage } from '../../../../types';
import { SearchTypes } from '../../../../types/enums';
import { SearchHitHead } from '../search-hit-head/search-hit-head.component';
import { getTranslateText } from '../../../../lib/translateText';
import SearchHitAccessRights from '../search-hit-access-rigths/search-hit-access-rights.component';
import SearchHitOpenData from '../search-hit-open-data/search-hit-open-data.component';
import SearchHitThemes from '../search-hit-themes/searh-hit-themes.component';
import SearchHitFormats from '../search-hit-formats/search-hit-formats';
import SearchHitData from '../search-hit-data/search-hit-data.component';
import SearchHitEvents from '../search-hit-events';
import TruncatedText from '../../../truncated-text';
import Markdown from '../../../markdown';

interface Props {
  id?: string;
  type: SearchTypes;
  title?: Partial<TextLanguage>;
  subtitle: React.ReactNode;
  description?: Partial<TextLanguage> | null;
  publisher?: Partial<Organization>;
  isAuthoritative?: boolean;
}

export const SearchHit: FC<Props> = ({
  id,
  type,
  title,
  subtitle,
  description,
  publisher,
  isAuthoritative = false,
  children
}) => {
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

  const renderSearchHitThemes = () => {
    const searchHitThemes = Children.map(children, child =>
      isValidElement(child) && child.type === SearchHitThemes ? (
        <SC.Theme>{child}</SC.Theme>
      ) : (
        []
      )
    );
    return _.isEmpty(searchHitThemes) ? undefined : (
      <li>{searchHitThemes?.shift()}</li>
    );
  };

  const renderSearchHitFormats = () => {
    const searchHitFormats = Children.map(children, child =>
      isValidElement(child) && child.type === SearchHitFormats ? (
        <SC.Format>{child}</SC.Format>
      ) : (
        []
      )
    );
    return _.isEmpty(searchHitFormats) ? undefined : (
      <ul>{searchHitFormats?.shift()}</ul>
    );
  };

  const renderSearchHitEvents = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SearchHitEvents ? (
        <SC.Event>{child}</SC.Event>
      ) : null
    )?.shift();

  const renderSearchHitData = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SearchHitData ? (
        <SC.Data>{child}</SC.Data>
      ) : null
    )?.shift();

  const translatedDescription = getTranslateText(description);

  return (
    <SC.SearchHit>
      <SearchHitHead
        id={id}
        type={type}
        title={title}
        subtitle={subtitle}
        isAuthoritative={isAuthoritative}
        publisher={publisher}
      />
      {translatedDescription && (
        <SC.Description>
          <TruncatedText visibleLines={4} lineHeight={20}>
            <Markdown>{translatedDescription}</Markdown>
          </TruncatedText>
        </SC.Description>
      )}
      <SC.Tags>
        {renderSearchHitOpenData()}
        {renderSearchHitAccessRights()}
        {renderSearchHitData()}
        {renderSearchHitThemes()}
      </SC.Tags>
      {renderSearchHitEvents()}
      {renderSearchHitFormats()}
    </SC.SearchHit>
  );
};
