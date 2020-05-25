import React, { FC, HTMLAttributes, memo } from 'react';

import SC from './styled';
import localization from '../../../../lib/localization';

interface Props extends HTMLAttributes<HTMLElement> {
  searchQuery: string;
  setSearchQuery: Function;
}
const OrganizationFilter: FC<Props> = ({ searchQuery, setSearchQuery }) => {
  return (
    <SC.Filter>
      <label className="uu-invisible" htmlFor="searchBox">
        {localization.searchOrganization}
      </label>
      <input
        aria-label={localization.searchOrganization}
        autoComplete="off"
        placeholder={localization.searchOrganization}
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <button
        aria-label={localization.query.reset}
        className="search-clear"
        type="button"
        onClick={() => setSearchQuery('')}
      >
        <SC.ClearIcon />
      </button>
    </SC.Filter>
  );
};

export default memo(OrganizationFilter);
