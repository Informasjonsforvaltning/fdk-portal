import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_ORGANIZATIONS_REQUESTED,
  GET_ORGANIZATIONS_SUCCEEDED
} from './action-types';

import { Actions, Organization } from '../../../types';
import { SortOrder } from '../../../types/enums';
import localization from '../../../lib/localization';

const sortOrganizationsByName = (
  organizations: Organization[],
  order: SortOrder
) => {
  return organizations.sort((a: any, b: any) => {
    const aObject =
      a.getIn(['organization', 'name', localization.getLanguage()]) ??
      a.getIn(['organization', 'name', 'nb']) ??
      a.getIn(['organization', 'name', 'nn']) ??
      a.getIn(['organization', 'name', 'no']) ??
      a.getIn(['organization', 'name', 'en']);
    const bObject =
      b.getIn(['organization', 'name', localization.getLanguage()]) ??
      b.getIn(['organization', 'name', 'nb']) ??
      b.getIn(['organization', 'name', 'nn']) ??
      b.getIn(['organization', 'name', 'no']) ??
      b.getIn(['organization', 'name', 'en']);

    return aObject.localeCompare(bObject) * (order === SortOrder.ASC ? 1 : -1);
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
