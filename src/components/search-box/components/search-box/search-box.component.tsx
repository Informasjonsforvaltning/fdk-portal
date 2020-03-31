import React, {
  Children,
  FC,
  isValidElement,
  memo,
  PropsWithChildren
} from 'react';

import SC from './styled';
import SearchForm from '../search-form/search-form.component';
import SearchLink from '../search-link/search-link.component';
import SearchBoxTitle from '../search-box-title/search-box-title.component';
import { Tabs } from '../../../../pages/search-page/tabs/tabs';

const SearchBox: FC<PropsWithChildren<any>> = ({ children }) => {
  const renderSearchBoxTitle = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SearchBoxTitle ? child : null
    )?.shift();

  const renderSearchLinks = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SearchLink ? child : null
    );

  const renderTabs = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === Tabs ? child : null
    )?.shift();

  return (
    <SC.SearchBox>
      <SC.Content>
        {renderSearchBoxTitle()}
        <SearchForm />
        {Children.count(renderSearchLinks()) > 0 && (
          <SC.SearchLinks>{renderSearchLinks()}</SC.SearchLinks>
        )}
      </SC.Content>
      {renderTabs()}
    </SC.SearchBox>
  );
};

export default memo(SearchBox);
