import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { getConfig } from '../../../config';

import { GET_DATASET_REQUESTED } from './action-types';
import * as actions from './actions';

import { Dataset } from '../../../types';

function* getDatasetRequested({
  payload: { id }
}: ReturnType<typeof actions.getDatasetRequested>) {
  try {
    const { data, errors } = yield call(
      axios.get,
      `${getConfig().datasetApi.host}/api/datasets/${id}`,
      {
        headers: { accept: 'application/json' }
      }
    );
    if (data) {
      yield put(actions.getDatasetSucceeded(data as Dataset));
    } else {
      yield put(actions.getDatasetFailed(JSON.stringify(errors)));
    }
  } catch (e) {
    yield put(actions.getDatasetFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_DATASET_REQUESTED, getDatasetRequested)]);
}
