import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_EVENT_TYPES_REQUESTED,
  GET_EVENT_TYPES_SUCCEEDED,
  RESET_EVENT_TYPES
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  eventTypes: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_EVENT_TYPES_REQUESTED:
      return state.set('eventTypes', fromJS([]));
    case GET_EVENT_TYPES_SUCCEEDED:
      return state.set('eventTypes', fromJS(action.payload.eventTypes));
    case RESET_EVENT_TYPES:
      return state.set('eventTypes', []);
    default:
      return state;
  }
}
