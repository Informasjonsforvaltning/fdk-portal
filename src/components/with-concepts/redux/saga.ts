import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_CONCEPTS_REQUESTED } from './action-types';
import * as actions from './actions';

import { conceptsSearch } from '../../../api/concepts';

import { Concept } from '../../../types';

function* getConceptsRequested({
  payload: { params }
}: ReturnType<typeof actions.getConceptsRequested>) {
  try {
    const data = yield call(conceptsSearch, params);
    if (data?._embedded?.concepts) {
      yield put(
        actions.getConceptsSucceeded(data?._embedded?.concepts as Concept[])
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
