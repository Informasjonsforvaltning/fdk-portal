import { all, call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { getConfig } from '../../../config';

import { GET_REFERENCE_DATA_REQUESTED } from './action-types';
import * as actions from './actions';

function* getReferenceDataRequested({
  payload: { category }
}: ReturnType<typeof actions.getReferenceDataRequested>) {
  try {
    const url =
      category === 'referencetypes'
        ? `${
            getConfig().referenceDataApi.host
          }/reference-data/codes/${category}`
        : `${getConfig().referenceDataApi.host}/reference-data/${category}`;
    const { data, errors } = yield call(axios.get, url, {
      headers: { accept: 'application/json' }
    });
    if (data) {
      yield put(actions.getReferenceDataSucceeded(category, data));
    } else {
      yield put(actions.getReferenceDataFailed(JSON.stringify(errors)));
    }
  } catch (e) {
    yield put(actions.getReferenceDataFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeEvery(GET_REFERENCE_DATA_REQUESTED, getReferenceDataRequested)
  ]);
}
