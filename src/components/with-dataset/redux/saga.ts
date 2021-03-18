import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_DATASET_REQUESTED } from './action-types';
import * as actions from './actions';
import { Dataset } from '../../../types';
import {
  searchDatasets,
  paramsToSearchBody,
  extractFirstDataset
} from '../../../api/search-fulltext-api/datasets';

import LoggingService, { Severity } from '../../../services/logging';

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
      LoggingService.postLogEntry({
        message: `Could not get dataset with ID: ${id}`,
        severity: Severity.WARN
      });
      yield put(actions.getDatasetFailed(''));
    }
  } catch (error) {
    const { name, message, stack: trace } = error as Error;
    LoggingService.postLogEntry({
      message:
        message ?? `Application error when getting dataset with ID: ${id}`,
      severity: Severity.ERROR,
      name,
      trace
    });
    yield put(actions.getDatasetFailed(message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_DATASET_REQUESTED, getDatasetRequested)]);
}
