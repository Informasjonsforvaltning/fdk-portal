import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_DATASET_REQUESTED } from './action-types';
import * as actions from './actions';

import LoggingService, { Severity } from '../../../services/logging';

import { getDataset } from '../../../services/api/harvester-bff';
import { Dataset } from '../../../types';

function* getDatasetRequested({
  payload: { id }
}: ReturnType<typeof actions.getDatasetRequested>) {
  try {
    const dataset: Dataset = yield call(getDataset, id);

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
