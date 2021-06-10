import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  SEARCH_TOPICS_REQUESTED,
  GET_RECENT_POSTS_REQUESTED
} from './action-types';
import * as actions from './actions';

import {
  extractTopicsFromSearch,
  getRecentPosts,
  getTopicById,
  searchCommunity
} from '../../../api/community-api/search';

import type { CommunityPost, CommunityTopic } from '../../../types';

function* searchTopicsRequested({
  payload: { queryTerm }
}: ReturnType<typeof actions.searchTopicsRequested>) {
  try {
    const postHits: CommunityPost[] = yield call(searchCommunity, queryTerm);
    const topics: CommunityTopic[] = (
      (yield all(
        extractTopicsFromSearch(postHits).map(({ tid }) =>
          call(getTopicById, tid)
        )
      )) as CommunityTopic[]
    ).filter(Boolean);

    if (topics.length > 0) {
      yield put(actions.searchTopicsSucceeded(topics));
    } else {
      yield put(actions.searchTopicsFailed(''));
    }
  } catch (e) {
    yield put(actions.searchTopicsFailed(e.message));
  }
}

function* recentPostsRequested({
  payload: { term }
}: ReturnType<typeof actions.getRecentPostsRequested>) {
  try {
    const posts: CommunityPost[] = yield call(getRecentPosts, term);

    if (posts.length > 0) {
      yield put(actions.getRecentPostsSucceeded(posts));
    } else {
      yield put(actions.getRecentPostsFailed(''));
    }
  } catch (e) {
    yield put(actions.getRecentPostsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(SEARCH_TOPICS_REQUESTED, searchTopicsRequested),
    takeLatest(GET_RECENT_POSTS_REQUESTED, recentPostsRequested)
  ]);
}
