import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_DATA_SERVICE_REQUESTED } from './action-types';
import * as actions from './actions';

import LoggingService, { Severity } from '../../../services/logging';

import { getDataService } from '../../../services/api/resource';
import { DataService } from '../../../types';

function* getDataServiceRequested({
  payload: { id }
}: ReturnType<typeof actions.getDataServiceRequested>) {
  try {
    const dataService: DataService = yield call(getDataService, id);

    if (dataService) {
      yield put(actions.getDataServiceSucceeded(dataService));
    } else {
      LoggingService.postLogEntry({
        message: `Could not get data service with ID: ${id}`,
        severity: Severity.WARN
      });
      yield put(actions.getDataServiceFailed(''));
    }
  } catch (error) {
    const { name, message, stack: trace } = error as Error;
    LoggingService.postLogEntry({
      message:
        message ?? `Application error when getting data service with ID: ${id}`,
      severity: Severity.ERROR,
      name,
      trace
    });
    yield put(actions.getDataServiceFailed(message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_DATA_SERVICE_REQUESTED, getDataServiceRequested)]);
}
