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
import SearchBoxHeader from '../search-box-header/search-box-header.component';
import { Tabs } from '../../../../pages/search-page/tabs/tabs';

const SearchBox: FC<PropsWithChildren<any>> = ({ children }) => {
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

  return (
    <SC.SearchBox>
      <SC.Content>
        {renderSearchBoxHeader()}
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
