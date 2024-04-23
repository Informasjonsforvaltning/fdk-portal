import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_PUBLIC_SERVICES_AND_EVENTS_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  extractPublicServicesAndEvents,
  extractPublicServicesAndEventsAggregations,
  extractPublicServicesAndEventsPage,
  searchPublicServicesAndEvents
} from '../../../api/search-api/public-services-and-events';
import { paramsToSearchBody } from '../../../utils/common';

function* getPublicServicesAndEventsRequested({
  payload: {
    params: { page, size, q, sortfield, orgPath, keyword, uri }
  }
}: ReturnType<typeof actions.getPublicServicesAndEventsRequested>) {
  try {
    const data: Record<string, any> = yield call(
      searchPublicServicesAndEvents,
      paramsToSearchBody({
        page,
        size,
        q,
        sortfield: sortfield ?? undefined,
        orgPath,
        keyword,
        uri
      })
    );

    if (data) {
      yield put(
        actions.getPublicServicesAndEventsSucceeded(
          extractPublicServicesAndEvents(data),
          extractPublicServicesAndEventsAggregations(data),
          extractPublicServicesAndEventsPage(data)
        )
      );
    } else {
      yield put(actions.getPublicServicesAndEventsFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getPublicServicesAndEventsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(
      GET_PUBLIC_SERVICES_AND_EVENTS_REQUESTED,
      getPublicServicesAndEventsRequested
    )
  ]);
}
