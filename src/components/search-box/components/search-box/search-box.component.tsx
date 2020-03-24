import React, { Children, FC, isValidElement, memo } from 'react';

import SC from './styled';
import SearchForm from '../search-form/search-form.component';
import SearchBoxTitle from '../search-box-title/search-box-title.component';
import { Tabs } from '../../../../pages/search-page/tabs/tabs';

const SearchBox: FC = ({ children }) => {
  const renderSearchBoxTitle = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SearchBoxTitle ? child : null
    )?.shift();

  const renderTabs = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === Tabs ? child : null
    )?.shift();

  return (
    <SC.SearchBox>
      <SC.Content>
        {renderSearchBoxTitle()}
        <SearchForm />
      </SC.Content>
      {renderTabs()}
    </SC.SearchBox>
  );
};

export default memo(SearchBox);
