import { all, call, put, takeLatest } from 'redux-saga/effects';

import { SEARCH_TOPICS_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  extractTopicsFromSearch,
  getTopicById,
  searchCommunity
} from '../../../api/community-api/search';

import type { CommunityPost, CommunityTopic } from '../../../types';

function* searchTopicsRequested({
  payload: { queryTerm }
}: ReturnType<typeof actions.searchTopicsRequested>) {
  try {
    const postHits: CommunityPost[] = yield call(searchCommunity, queryTerm);
    const topics: CommunityTopic[] = (yield all(
      extractTopicsFromSearch(postHits).map(({ tid }) =>
        call(getTopicById, tid)
      )
    )).filter(Boolean);

    if (topics.length > 0) {
      yield put(actions.searchTopicsSucceeded(topics));
    } else {
      yield put(actions.searchTopicsFailed(''));
    }
  } catch (e) {
    yield put(actions.searchTopicsFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(SEARCH_TOPICS_REQUESTED, searchTopicsRequested)]);
}
