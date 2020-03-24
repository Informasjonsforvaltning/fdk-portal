import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { getConfig } from '../../../config';

import { GET_CONCEPTS_REQUESTED } from './action-types';
import * as actions from './actions';

import { Concept } from '../../../types';

function* getConceptsRequested({
  payload: { params }
}: ReturnType<typeof actions.getConceptsRequested>) {
  try {
    const { data, errors } = yield call(
      axios.get,
      `${getConfig().conceptApi.host}/api/concepts`,
      {
        headers: { accept: 'application/json' },
        params
      }
    );
    if (data?._embedded?.concepts) {
      yield put(
        actions.getConceptsSucceeded(data?._embedded?.concepts as Concept[])
      );
    } else {
      yield put(actions.getConceptsFailed(JSON.stringify(errors)));
    }
  } catch (e) {
    yield put(actions.getConceptsFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_CONCEPTS_REQUESTED, getConceptsRequested)]);
}
