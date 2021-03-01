import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_EVENTS_REQUESTED,
  GET_EVENTS_SUCCEEDED,
  RESET_EVENTS,
  GET_EVENTS_RELATIONS_REQUESTED,
  GET_EVENTS_RELATIONS_SUCCEEDED,
  RESET_EVENTS_RELATIONS
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  events: [],
  eventsRelations: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_EVENTS_REQUESTED:
      return state.set('events', fromJS([]));
    case GET_EVENTS_SUCCEEDED:
      return state.set('events', fromJS(action.payload.events));
    case RESET_EVENTS:
      return state.set('events', fromJS([]));
    case GET_EVENTS_RELATIONS_REQUESTED:
      return state.set('eventsRelations', fromJS([]));
    case GET_EVENTS_RELATIONS_SUCCEEDED:
      return state.set('eventsRelations', fromJS(action.payload.events));
    case RESET_EVENTS_RELATIONS:
      return state.set('eventsRelations', fromJS([]));
    default:
      return state;
  }
}
