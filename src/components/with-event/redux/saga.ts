import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_EVENT_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  extractFirstEvent,
  searchEvents,
  paramsToSearchBody
} from '../../../api/search-fulltext-api/events';

import LoggingService, { Severity } from '../../../services/logging';

function* getEventRequested({
  payload: { id }
}: ReturnType<typeof actions.getEventRequested>) {
  try {
    const data: Record<string, any> = yield call(
      searchEvents,
      paramsToSearchBody({ id })
    );
    const event = extractFirstEvent(data);

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
