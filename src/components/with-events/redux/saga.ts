import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  GET_EVENTS_REQUESTED,
  GET_EVENTS_RELATIONS_REQUESTED
} from './action-types';
import * as actions from './actions';

import {
  extractEvents,
  searchEvents,
  paramsToSearchBody
} from '../../../api/search-fulltext-api/events';

import type { Event } from '../../../types';

function* getEventsRequested({
  payload: {
    params: { size, relation }
  }
}: ReturnType<typeof actions.getEventsRequested>) {
  try {
    const data = yield call(
      searchEvents,
      paramsToSearchBody({ size, relation })
    );

    if (data) {
      yield put(actions.getEventsSucceeded(extractEvents(data) as Event[]));
    } else {
      yield put(actions.getEventsFailed(''));
    }
  } catch (e) {
    yield put(actions.getEventsFailed(e.message));
  }
}

function* getEventsRelationsRequested({
  payload: {
    params: { size, relation }
  }
}: ReturnType<typeof actions.getEventsRelationsRequested>) {
  try {
    const data = yield call(
      searchEvents,
      paramsToSearchBody({ size, relation })
    );

    if (data) {
      yield put(
        actions.getEventsRelationsSucceeded(extractEvents(data) as Event[])
      );
    } else {
      yield put(actions.getEventsRelationsFailed(''));
    }
  } catch (e) {
    yield put(actions.getEventsRelationsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_EVENTS_REQUESTED, getEventsRequested),
    takeLatest(GET_EVENTS_RELATIONS_REQUESTED, getEventsRelationsRequested)
  ]);
}
