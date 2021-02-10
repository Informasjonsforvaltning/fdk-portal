import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_EVENTS_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  extractEvents,
  searchEvents,
  paramsToSearchBody
} from '../../../api/search-fulltext-api/events';

import type { Event } from '../../../types';

function* getEventsRequested({
  payload: {
    params: { size }
  }
}: ReturnType<typeof actions.getEventsRequested>) {
  try {
    const data = yield call(searchEvents, paramsToSearchBody({ size }));

    if (data) {
      yield put(actions.getEventsSucceeded(extractEvents(data) as Event[]));
    } else {
      yield put(actions.getEventsFailed(''));
    }
  } catch (e) {
    yield put(actions.getEventsFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_EVENTS_REQUESTED, getEventsRequested)]);
}
