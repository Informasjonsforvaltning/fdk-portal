import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_EVENT_FAILED,
  GET_EVENT_REQUESTED,
  GET_EVENT_SUCCEEDED,
  RESET_EVENT
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  event: null,
  isLoadingEvent: false
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_EVENT_REQUESTED:
      return state.set('event', null).set('isLoadingEvent', true);
    case GET_EVENT_SUCCEEDED:
      return state
        .set('event', fromJS(action.payload.event))
        .set('isLoadingEvent', false);
    case GET_EVENT_FAILED:
      return state.set('isLoadingEvent', false);
    case RESET_EVENT:
      return state.set('event', null).set('isLoadingEvent', false);
    default:
      return state;
  }
}
