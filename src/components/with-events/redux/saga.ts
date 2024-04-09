import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_EVENTS_REQUESTED } from './action-types';
import * as actions from './actions';

import { extractEvents, searchEvents } from '../../../api/search-api/events';

import type { SearchObject } from '../../../types';
import { paramsToSearchBody } from '../../../utils/common';

function* getEventsRequested({
  payload: {
    params: { size, relation, uris }
  }
}: ReturnType<typeof actions.getEventsRequested>) {
  try {
    const data: Record<string, any> = yield call(
      searchEvents,
      paramsToSearchBody({ size, relation, uris })
    );

    if (data) {
      yield put(
        actions.getEventsSucceeded(extractEvents(data) as SearchObject[])
      );
    } else {
      yield put(actions.getEventsFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getEventsFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_EVENTS_REQUESTED, getEventsRequested)]);
}
