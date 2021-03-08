import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_DATASET_REQUESTED } from './action-types';
import * as actions from './actions';
import { Dataset } from '../../../types';
import {
  searchDatasets,
  paramsToSearchBody,
  extractFirstDataset
} from '../../../api/search-fulltext-api/datasets';

function* getDatasetRequested({
  payload: { id }
}: ReturnType<typeof actions.getDatasetRequested>) {
  try {
    const params = paramsToSearchBody({ id });
    const data = yield call(searchDatasets, params);
    const dataset = extractFirstDataset(data) as Dataset;

    if (dataset) {
      yield put(actions.getDatasetSucceeded(dataset));
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
