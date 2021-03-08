import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_EVENT_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  extractFirstEvent,
  searchEvents,
  paramsToSearchBody
} from '../../../api/search-fulltext-api/events';

import type { Event } from '../../../types';

function* getEventRequested({
  payload: { id }
}: ReturnType<typeof actions.getEventRequested>) {
  try {
    const data = yield call(searchEvents, paramsToSearchBody({ id }));
    const event = extractFirstEvent(data) as Event;

    if (event) {
      yield put(actions.getEventSucceeded(event));
    } else {
      yield put(actions.getEventFailed(''));
    }
  } catch (e) {
    yield put(actions.getEventFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_EVENT_REQUESTED, getEventRequested)]);
}
