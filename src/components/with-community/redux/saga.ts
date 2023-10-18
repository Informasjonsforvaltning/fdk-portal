import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  SEARCH_TOPICS_REQUESTED,
  GET_RECENT_POSTS_REQUESTED,
  SEARCH_REQUESTS_REQUESTED
} from './action-types';
import * as actions from './actions';

import {
  extractTopicsFromSearch,
  getRecentPosts,
  getTopicById,
  pruneNodebbTemplateTags,
  searchCommunity,
  searchCommunityRequests
} from '../../../api/community-api/search';

import type { CommunityPost, CommunityTopic } from '../../../types';

function* searchTopicsRequested({
  payload: { queryTerm }
}: ReturnType<typeof actions.searchTopicsRequested>) {
  try {
    const postHits: CommunityPost = yield call(searchCommunity, queryTerm);
    const { multiplePages } = postHits;
    const topics: CommunityTopic[] = (
      (yield all(
        extractTopicsFromSearch(postHits).map(({ tid }) =>
          call(getTopicById, tid)
        )
      )) as CommunityTopic[]
    ).filter(Boolean);

    if (topics.length > 0) {
      yield put(actions.searchTopicsSucceeded(topics, multiplePages));
    } else {
      yield put(actions.searchTopicsFailed(''));
    }
  } catch (e: any) {
    yield put(actions.searchTopicsFailed(e.message));
  }
}

function* searchRequestsRequested({
  payload: { queryTerm, sortOption, page }
}: ReturnType<typeof actions.searchRequestsRequested>) {
  try {
    const postHits: CommunityPost = yield call(
      searchCommunityRequests,
      queryTerm,
      page,
      sortOption
    );
    const { pagination } = postHits;
    const requests: CommunityTopic[] = (
      (yield all(
        extractTopicsFromSearch(postHits).map(({ tid }) =>
          call(getTopicById, tid)
        )
      )) as CommunityTopic[]
    ).filter(Boolean);

    if (requests.length > 0) {
      yield put(actions.searchRequestsSucceeded(requests, pagination));
    } else {
      yield put(actions.searchTopicsFailed(''));
    }
  } catch (e: any) {
    yield put(actions.searchRequestsFailed(e.message));
  }
}

function* recentPostsRequested({
  payload: { term }
}: ReturnType<typeof actions.getRecentPostsRequested>) {
  try {
    const posts: CommunityPost[] = yield call(getRecentPosts, term);

    if (posts.length > 0) {
      const processedPosts = posts.map(post => ({
        ...post,
        content: pruneNodebbTemplateTags(post.content)
      }));
      yield put(actions.getRecentPostsSucceeded(processedPosts));
    } else {
      yield put(actions.getRecentPostsFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getRecentPostsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(SEARCH_TOPICS_REQUESTED, searchTopicsRequested),
    takeLatest(GET_RECENT_POSTS_REQUESTED, recentPostsRequested),
    takeLatest(SEARCH_REQUESTS_REQUESTED, searchRequestsRequested)
  ]);
}
