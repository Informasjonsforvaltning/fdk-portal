import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_DATASET_REQUESTED } from './action-types';
import * as actions from './actions';

import { getDataset } from '../../../api/datasets';

import { Dataset } from '../../../types';

function* getDatasetRequested({
  payload: { id }
}: ReturnType<typeof actions.getDatasetRequested>) {
  try {
    const data = yield call(getDataset, id);
    if (data) {
      yield put(actions.getDatasetSucceeded(data as Dataset));
    } else {
      yield put(actions.getDatasetFailed(''));
    }
  } catch (e) {
    yield put(actions.getDatasetFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_DATASET_REQUESTED, getDatasetRequested)]);
}
