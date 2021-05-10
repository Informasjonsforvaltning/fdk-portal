import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_ORGANIZATIONS_REQUESTED,
  GET_ORGANIZATIONS_SUCCEEDED
} from './action-types';

import { Actions } from '../../../types';

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
      return state.set('organizations', fromJS(action.payload.organizations));
    default:
      return state;
  }
}
