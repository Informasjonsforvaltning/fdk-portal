import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_CONCEPT_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  searchConcepts,
  paramsToSearchBody,
  extractFirstConcept
} from '../../../api/search-fulltext-api/concepts';

import type { Concept } from '../../../types';

function* getConceptRequested({
  payload: { id }
}: ReturnType<typeof actions.getConceptRequested>) {
  try {
    const data = yield call(searchConcepts, paramsToSearchBody({ id }));
    const concept = extractFirstConcept(data) as Concept;

    if (concept) {
      yield put(actions.getConceptSucceeded(concept));
    } else {
      yield put(actions.getConceptFailed(''));
    }
  } catch (e) {
    yield put(actions.getConceptFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_CONCEPT_REQUESTED, getConceptRequested)]);
}
