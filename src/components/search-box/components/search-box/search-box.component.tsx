import React, {
  ChangeEvent,
  Children,
  FC,
  isValidElement,
  memo,
  PropsWithChildren,
  useEffect,
  useState
} from 'react';

import { compose } from 'redux';
import SC from './styled';
import SearchForm from '../search-form/search-form.component';
import SearchLink from '../search-link/search-link.component';
import SearchBoxHeader from '../search-box-header/search-box-header.component';
import { Tabs } from '../../../../pages/search-page/tabs/tabs';
import withSearchSuggestions, {
  Props as SearchSuggestionProps
} from '../../../with-suggestions';
import { getConfig } from '../../../../config';

const SearchBox: FC<PropsWithChildren<SearchSuggestionProps>> = ({
  children,
  cachedSuggestions,
  searchSuggestionsActions: {
    getSearchSuggestionsRequested: getSearchSuggestions,
    resetSearchSuggestions
  }
}) => {
  const isNap = getConfig().filterTransportDatasets;

  const [searchString, setSearchString] = useState('');

  const renderSearchBoxHeader = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SearchBoxHeader ? child : null
    )?.shift();

  const renderSearchLinks = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SearchLink ? child : null
    );

  const renderTabs = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === Tabs ? child : null
    )?.shift();

  const searchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
    if (!cachedSuggestions[e.target.value] && e.target.value.length > 1) {
      getSearchSuggestions(e.target.value, isNap);
    }
  };

  useEffect(
    () => () => {
      resetSearchSuggestions();
    },
    []
  );

  return (
    <SC.SearchBox>
      <SC.Content>
        {renderSearchBoxHeader()}
        <SearchForm
          suggestions={cachedSuggestions[searchString]}
          onChangeHandler={searchChange}
        />
        {Children.count(renderSearchLinks()) > 0 && (
          <SC.SearchLinks>{renderSearchLinks()}</SC.SearchLinks>
        )}
      </SC.Content>
      {renderTabs()}
    </SC.SearchBox>
  );
};

export default compose<FC<any>>(withSearchSuggestions, memo)(SearchBox);
