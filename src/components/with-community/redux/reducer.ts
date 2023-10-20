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
  RESET_POSTS,
  SEARCH_REQUESTS_REQUESTED,
  SEARCH_REQUESTS_SUCCEEDED,
  SEARCH_REQUESTS_FAILED,
  GET_REQUEST_CATEGORY_REQUESTED,
  GET_REQUEST_CATEGORY_SUCCEEDED,
  GET_REQUEST_CATEGORY_FAILED
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  topics: [],
  multiplePages: false,
  posts: [],
  requests: [],
  pagination: {},
  requestCategory: {}
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
    case SEARCH_TOPICS_FAILED:
    case GET_RECENT_POSTS_REQUESTED:
      return state.set('posts', fromJS([]));
    case GET_RECENT_POSTS_SUCCEEDED:
      return state.set('posts', fromJS(action.payload.posts));
    case RESET_TOPICS:
      return state.set('topics', fromJS([]));
    case GET_RECENT_POSTS_FAILED:
    case RESET_POSTS:
      return state.set('posts', fromJS([]));
    case SEARCH_REQUESTS_REQUESTED:
      return state.set('requests', fromJS([]));
    case SEARCH_REQUESTS_SUCCEEDED:
      return state
        .set('requests', fromJS(action.payload.requests))
        .set('pagination', fromJS(action.payload.pagination));
    case SEARCH_REQUESTS_FAILED:
    case GET_REQUEST_CATEGORY_REQUESTED:
      return state.set('requestCategory', fromJS([]));
    case GET_REQUEST_CATEGORY_SUCCEEDED:
      return state.set(
        'requestCategory',
        fromJS(action.payload.requestCategory)
      );
    case GET_REQUEST_CATEGORY_FAILED:

    default:
      return state;
  }
}
