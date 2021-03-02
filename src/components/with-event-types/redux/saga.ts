import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_EVENT_TYPES_REQUESTED } from './action-types';
import * as actions from './actions';

import { getEventTypes } from './utils';

import type { EventType } from '../../../types';

function* getEventTypesRequested() {
  try {
    const eventTypes: EventType[] = yield call(getEventTypes);

    if (eventTypes) {
      yield put(actions.getEventTypesSucceeded(eventTypes));
    } else {
      yield put(actions.getEventTypesFailed(''));
    }
  } catch (e) {
    yield put(actions.getEventTypesFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_EVENT_TYPES_REQUESTED, getEventTypesRequested)]);
}
