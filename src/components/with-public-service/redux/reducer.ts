import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_PUBLIC_SERVICE_FAILED,
  GET_PUBLIC_SERVICE_REQUESTED,
  GET_PUBLIC_SERVICE_SUCCEEDED,
  RESET_PUBLIC_SERVICE
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  publicService: null
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_PUBLIC_SERVICE_REQUESTED:
      return state.set('publicService', null);
    case GET_PUBLIC_SERVICE_SUCCEEDED:
      return state.set('publicService', fromJS(action.payload.publicService));
    case GET_PUBLIC_SERVICE_FAILED:
      return state;
    case RESET_PUBLIC_SERVICE:
      return state.set('publicService', null);
    default:
      return state;
  }
}
