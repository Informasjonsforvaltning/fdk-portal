import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_PUBLIC_SERVICE_REQUESTED } from './action-types';
import * as actions from './actions';

import LoggingService, { Severity } from '../../../services/logging';

import { getPublicService } from '../../../services/api/resource';
import { PublicService } from '../../../types';

function* getPublicServiceRequested({
  payload: { id }
}: ReturnType<typeof actions.getPublicServiceRequested>) {
  try {
    const publicService: PublicService = yield call(getPublicService, id);

    if (publicService) {
      yield put(actions.getPublicServiceSucceeded(publicService));
    } else {
      LoggingService.postLogEntry({
        message: `Could not get public service with ID: ${id}`,
        severity: Severity.WARN
      });
      yield put(actions.getPublicServiceFailed(''));
    }
  } catch (error) {
    const { name, message, stack: trace } = error as Error;
    LoggingService.postLogEntry({
      message:
        message ??
        `Application error when getting public service with ID: ${id}`,
      severity: Severity.ERROR,
      name,
      trace
    });
    yield put(actions.getPublicServiceFailed(message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_PUBLIC_SERVICE_REQUESTED, getPublicServiceRequested)
  ]);
}
