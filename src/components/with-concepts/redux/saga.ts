import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_CONCEPTS_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  extractConcepts,
  paramsToSearchBody,
  searchConcepts
} from '../../../api/search-fulltext-api/concepts';

import type { Concept } from '../../../types';

function* getConceptsRequested({
  payload: {
    params: { identifiers, size }
  }
}: ReturnType<typeof actions.getConceptsRequested>) {
  try {
    const data = yield call(
      searchConcepts,
      paramsToSearchBody({ identifiers, size })
    );

    if (data) {
      yield put(
        actions.getConceptsSucceeded(extractConcepts(data) as Concept[])
      );
    } else {
      yield put(actions.getConceptsFailed(''));
    }
  } catch (e) {
    yield put(actions.getConceptsFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_CONCEPTS_REQUESTED, getConceptsRequested)]);
}
