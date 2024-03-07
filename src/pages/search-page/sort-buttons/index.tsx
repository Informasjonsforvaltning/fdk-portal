import React, { FC, memo, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import SC from './styled';
import localization from '../../../lib/localization';
import { getSortfield } from '../search-location-helper';
import ButtonToggleSC from '../../../components/button-toggle/styled';
import {
  historyPushSearchParams,
  parseSearchParams
} from '../../../lib/location-history-helper';

const SortButtons: FC<RouteComponentProps> = ({ history, location }) => {
  const [sortField, setSortField] = useState(getSortfield(location));

  const onSortByScoreClick = () => {
    setSortField(undefined);
    const oldSearchParams = parseSearchParams(location);
    const searchParams = {
      ...oldSearchParams,
      sortfield: undefined,
      page: null
    };
    historyPushSearchParams(history, searchParams);
  };
  const onSortByModifiedClick = () => {
    setSortField('FIRST_HARVESTED');
    const oldSearchParams = parseSearchParams(location);
    const searchParams = {
      ...oldSearchParams,
      sortfield: 'FIRST_HARVESTED',
      page: null
    };
    historyPushSearchParams(history, searchParams);
  };

  return (
    <SC.SortButtons>
      <ButtonToggleSC.ButtonToggle
        onClick={onSortByScoreClick}
        selected={sortField === undefined}
        borderLeft
      >
        {sortField === undefined && <ButtonToggleSC.CheckIcon />}
        {localization.formatString(
          sortField === undefined
            ? localization.sort.sortedBy
            : localization.sort.sortBy,
          {
            sortField: localization.sort.relevance
          }
        )}
      </ButtonToggleSC.ButtonToggle>
      <ButtonToggleSC.ButtonToggle
        onClick={onSortByModifiedClick}
        selected={sortField === 'FIRST_HARVESTED'}
        borderRight
      >
        {sortField === 'FIRST_HARVESTED' && <ButtonToggleSC.CheckIcon />}
        {localization.formatString(
          sortField === 'FIRST_HARVESTED'
            ? localization.sort.sortedBy
            : localization.sort.sortBy,
          {
            sortField: localization.sort.published
          }
        )}
      </ButtonToggleSC.ButtonToggle>
    </SC.SortButtons>
  );
};

export default memo(withRouter(SortButtons));
