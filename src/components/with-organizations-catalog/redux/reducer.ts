import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_ORGANIZATIONS_CATALOG_REQUESTED,
  GET_ORGANIZATIONS_CATALOG_SUCCEEDED,
  RESET_ORGANIZATIONS_CATALOG
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  organizations: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_ORGANIZATIONS_CATALOG_REQUESTED:
      return state.set('organizations', fromJS([]));
    case GET_ORGANIZATIONS_CATALOG_SUCCEEDED:
      return state.set('organizations', fromJS(action.payload.organizations));
    case RESET_ORGANIZATIONS_CATALOG:
      return state.set('organizations', null);
    default:
      return state;
  }
}
