import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_EVENTS_FAILED,
  GET_EVENTS_REQUESTED,
  GET_EVENTS_SUCCEEDED,
  RESET_EVENTS
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  events: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_EVENTS_REQUESTED:
      return state;
    case GET_EVENTS_SUCCEEDED:
      return state.set('events', fromJS(action.payload.events));
    case GET_EVENTS_FAILED:
      return state;
    case RESET_EVENTS:
      return state.set('events', fromJS([]));
    default:
      return state;
  }
}
