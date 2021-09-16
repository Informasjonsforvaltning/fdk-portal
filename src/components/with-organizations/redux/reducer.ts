import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_ORGANIZATIONS_REQUESTED,
  GET_ORGANIZATIONS_SUCCEEDED,
  SORT_ORGANIZATIONS
} from './action-types';

import { sortOrganizations } from './utils';

import type { Actions } from '../../../types';

const initialState = fromJS({
  organizations: []
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_ORGANIZATIONS_REQUESTED:
      return state.set('organizations', fromJS([]));
    case GET_ORGANIZATIONS_SUCCEEDED:
      return state
        .set('organizations', fromJS(action.payload.organizations))
        .update('organizations', sortOrganizations(['prefLabel']));
    case SORT_ORGANIZATIONS:
      return state.update(
        'organizations',
        sortOrganizations(action.payload.selector, action.payload.order)
      );
    default:
      return state;
  }
}
