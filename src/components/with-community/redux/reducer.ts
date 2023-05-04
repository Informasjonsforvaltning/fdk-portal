import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  SEARCH_TOPICS_REQUESTED,
  SEARCH_TOPICS_SUCCEEDED,
  SEARCH_TOPICS_FAILED,
  GET_RECENT_POSTS_REQUESTED,
  GET_RECENT_POSTS_SUCCEEDED,
  GET_RECENT_POSTS_FAILED,
  RESET_TOPICS,
  RESET_POSTS
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  topics: [],
  multiplePages: false,
  posts: []
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case SEARCH_TOPICS_REQUESTED:
      return state.set('topics', fromJS([]));
    case SEARCH_TOPICS_SUCCEEDED:
      return state
        .set('topics', fromJS(action.payload.topics))
        .set('multiplePages', fromJS(action.payload.multiplePages));
    case GET_RECENT_POSTS_REQUESTED:
      return state.set('posts', fromJS([]));
    case GET_RECENT_POSTS_SUCCEEDED:
      return state.set('posts', fromJS(action.payload.posts));
    case SEARCH_TOPICS_FAILED:
    case RESET_TOPICS:
      return state.set('topics', fromJS([]));
    case GET_RECENT_POSTS_FAILED:
    case RESET_POSTS:
      return state.set('posts', fromJS([]));
    default:
      return state;
  }
}
