import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_ORGANIZATION_REQUESTED,
  GET_ORGANIZATION_SUCCEEDED,
  GET_ORGANIZATION_FAILED,
  RESET_ORGANIZATION
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  organization: null
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_ORGANIZATION_REQUESTED:
      return state.set('organization', null);
    case GET_ORGANIZATION_SUCCEEDED:
      return state.set('organization', fromJS(action.payload.organization));
    case GET_ORGANIZATION_FAILED:
      return state;
    case RESET_ORGANIZATION:
      return state.set('organization', null);
    default:
      return state;
  }
}
