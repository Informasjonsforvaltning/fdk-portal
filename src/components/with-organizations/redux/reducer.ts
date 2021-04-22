import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_ORGANIZATIONS_REQUESTED,
  GET_ORGANIZATIONS_SUCCEEDED
} from './action-types';

import { Actions, OrganizationSummary } from '../../../types';
import { SortOrder } from '../../../types/enums';
import localization from '../../../lib/localization';

const sortOrganizationsByName = (
  organizations: OrganizationSummary[],
  order: SortOrder
) => {
  return organizations.sort((a: any, b: any) => {
    const aObject =
      a.getIn(['prefLabel', localization.getLanguage()]) ?? a.getIn(['name']);
    const bObject =
      b.getIn(['prefLabel', localization.getLanguage()]) ?? b.getIn(['name']);

    return (
      aObject?.localeCompare(bObject, 'no') * (order === SortOrder.ASC ? 1 : -1)
    );
  });
};

const initialState = fromJS({
  organizations: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_ORGANIZATIONS_REQUESTED:
      return state.set('organizations', fromJS([]));
    case GET_ORGANIZATIONS_SUCCEEDED:
      return state.set(
        'organizations',
        sortOrganizationsByName(
          fromJS(action.payload.organizations),
          SortOrder.ASC
        )
      );
    default:
      return state;
  }
}
