import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_PUBLIC_SERVICES_AND_EVENTS_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  extractPublicServicesAndEvents,
  extractPublicServicesAndEventsAggregations,
  extractPublicServicesAndEventsPage,
  paramsToSearchBody,
  searchPublicServicesAndEvents
} from '../../../api/search-fulltext-api/public-services-and-events';

function* getPublicServicesAndEventsRequested({
  payload: {
    params: {
      page,
      sortfield,
      size,
      q,
      orgPath,
      event,
      keywords,
      publicServiceAndEventIdentifiers,
      eventType
    }
  }
}: ReturnType<typeof actions.getPublicServicesAndEventsRequested>) {
  try {
    const data: Record<string, any> = yield call(
      searchPublicServicesAndEvents,
      paramsToSearchBody({
        page,
        sortfield,
        size,
        q,
        orgPath,
        event,
        keywords,
        publicServiceAndEventIdentifiers,
        eventType
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
  } catch (e) {
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
