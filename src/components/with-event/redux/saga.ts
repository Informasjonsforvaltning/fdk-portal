import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_EVENT_REQUESTED } from './action-types';
import * as actions from './actions';

import LoggingService, { Severity } from '../../../services/logging';

import { getEvent } from '../../../services/api/harvester-bff';
import { Event } from '../../../types';

function* getEventRequested({
  payload: { id }
}: ReturnType<typeof actions.getEventRequested>) {
  try {
    const event: Event = yield call(getEvent, id);

    if (event) {
      yield put(actions.getEventSucceeded(event));
    } else {
      LoggingService.postLogEntry({
        message: `Could not get event with ID: ${id}`,
        severity: Severity.WARN
      });
      yield put(actions.getEventFailed(''));
    }
  } catch (error) {
    const { name, message, stack: trace } = error as Error;
    LoggingService.postLogEntry({
      message: message ?? `Application error when getting event with ID: ${id}`,
      severity: Severity.ERROR,
      name,
      trace
    });
    yield put(actions.getEventFailed(message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_EVENT_REQUESTED, getEventRequested)]);
}
