import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  GET_CONCEPTS_REQUESTED,
  GET_CONCEPTS_RELATIONS_REQUESTED
} from './action-types';
import * as actions from './actions';

import {
  extractConcepts,
  paramsToSearchBody,
  searchConcepts
} from '../../../api/search-fulltext-api/concepts';

import type { Concept } from '../../../types';

function* getConceptsRequested({
  payload: {
    params: { identifiers, size, seeAlso }
  }
}: ReturnType<typeof actions.getConceptsRequested>) {
  try {
    const data: Record<string, any> = yield call(
      searchConcepts,
      paramsToSearchBody({ identifiers, size, seeAlso })
    );

    if (data) {
      yield put(
        actions.getConceptsSucceeded(extractConcepts(data) as Concept[])
      );
    } else {
      yield put(actions.getConceptsFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getConceptsFailed(e.message));
  }
}

function* getConceptsRelationsRequested({
  payload: {
    params: { identifiers, size, seeAlso }
  }
}: ReturnType<typeof actions.getConceptsRelationsRequested>) {
  try {
    const data: Record<string, any> = yield call(
      searchConcepts,
      paramsToSearchBody({ identifiers, size, seeAlso })
    );

    if (data) {
      yield put(
        actions.getConceptsRelationsSucceeded(
          extractConcepts(data) as Concept[]
        )
      );
    } else {
      yield put(actions.getConceptsRelationsFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getConceptsRelationsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_CONCEPTS_REQUESTED, getConceptsRequested),
    takeLatest(GET_CONCEPTS_RELATIONS_REQUESTED, getConceptsRelationsRequested)
  ]);
}
