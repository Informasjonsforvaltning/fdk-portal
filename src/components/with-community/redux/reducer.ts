import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  SEARCH_TOPICS_REQUESTED,
  SEARCH_TOPICS_SUCCEEDED,
  RESET_TOPICS
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  topics: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case SEARCH_TOPICS_REQUESTED:
      return state.set('topics', fromJS([]));
    case SEARCH_TOPICS_SUCCEEDED:
      return state.set('topics', fromJS(action.payload.topics));
    case RESET_TOPICS:
      return state.set('topics', fromJS([]));
    default:
      return state;
  }
}
