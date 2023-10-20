import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  SEARCH_TOPICS_REQUESTED,
  GET_RECENT_POSTS_REQUESTED,
  SEARCH_REQUESTS_REQUESTED,
  GET_REQUEST_CATEGORY_REQUESTED
} from './action-types';
import * as actions from './actions';

import {
  extractTopicsFromSearch,
  getRecentPosts,
  getRequestCategory,
  getTopicById,
  pruneNodebbTemplateTags,
  searchCommunity,
  searchCommunityRequests
} from '../../../api/community-api/search';

import type {
  CommunityCategory,
  CommunityPost,
  CommunityTopic
} from '../../../types';

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

function* getRequestCategoryRequested() {
  try {
    const requestCategory: CommunityCategory = yield call(getRequestCategory);

    if (requestCategory !== null && requestCategory !== undefined) {
      yield put(actions.getRequestCategorySucceeded(requestCategory));
    } else {
      yield put(actions.getRequestCategoryFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getRequestCategoryFailed(e.message));
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

    const allRequestTopics: CommunityCategory = yield call(getRequestCategory);
    const { topics } = allRequestTopics;

    const requests: CommunityTopic[] = (
      (yield all(
        postHits.posts.map(({ tid }) =>
          topics.filter(topic => topic.tid === tid)
        )
      )) as CommunityTopic[]
    )
      .filter(Boolean)
      .flat();

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
    takeLatest(SEARCH_REQUESTS_REQUESTED, searchRequestsRequested),
    takeLatest(GET_REQUEST_CATEGORY_REQUESTED, getRequestCategoryRequested)
  ]);
}
