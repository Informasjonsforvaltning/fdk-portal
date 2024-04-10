import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_CONCEPTS_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  extractConcepts,
  searchConcepts
} from '../../../api/search-api/concepts';

import type { SearchObject } from '../../../types';
import { paramsToSearchBody } from '../../../utils/common';

function* getConceptsRequested({
  payload: {
    params: { uri, size }
  }
}: ReturnType<typeof actions.getConceptsRequested>) {
  try {
    const data: Record<string, any> = yield call(
      searchConcepts,
      paramsToSearchBody({ size, filters: { uri } }) // TODO JERE: Add seeAlso to filters
    );

    if (data) {
      yield put(
        actions.getConceptsSucceeded(extractConcepts(data) as SearchObject[])
      );
    } else {
      yield put(actions.getConceptsFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getConceptsFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_CONCEPTS_REQUESTED, getConceptsRequested)]);
}
