import React, {
  Children,
  FC,
  isValidElement,
  memo,
  PropsWithChildren
} from 'react';

import { compose } from 'redux';
import SC from './styled';
import SearchForm from '../search-form/search-form.component';
import SearchLink from '../search-link/search-link.component';
import SearchBoxHeader from '../search-box-header/search-box-header.component';
import { Tabs } from '../../../../pages/search-page/tabs/tabs';
import Autosuggest from '../autosuggest';

interface ExternalProps {
  placeholder: string;
  autosuggest?: boolean;
}

interface Props extends ExternalProps {}

const SearchBox: FC<PropsWithChildren<Props>> = ({
  placeholder,
  autosuggest,
  children
}) => {
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
        {autosuggest ? (
          <Autosuggest placeholder={placeholder} />
        ) : (
          <SearchForm placeholder={placeholder} />
        )}

        {Children.count(renderSearchLinks()) > 0 && (
          <SC.SearchLinks>{renderSearchLinks()}</SC.SearchLinks>
        )}
      </SC.Content>
      {renderTabs()}
    </SC.SearchBox>
  );
};

export default compose<FC<ExternalProps>>(memo)(SearchBox);
