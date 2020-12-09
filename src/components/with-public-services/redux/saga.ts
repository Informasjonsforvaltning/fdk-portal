import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_PUBLIC_SERVICES_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  extractPublicServices,
  extractPublicServicesAggregations,
  extractPublicServicesPage,
  paramsToSearchBody,
  searchPublicServices
} from '../../../api/search-fulltext-api/public-services';

function* getPublicServicesRequested({
  payload: {
    params: { size, q, orgPath, isGroupedBy, keywords }
  }
}: ReturnType<typeof actions.getPublicServicesRequested>) {
  try {
    const data = yield call(
      searchPublicServices,
      paramsToSearchBody({ size, q, orgPath, isGroupedBy, keywords })
    );

    if (data) {
      yield put(
        actions.getPublicServicesSucceeded({
          hits: extractPublicServices(data),
          aggregations: extractPublicServicesAggregations(data),
          page: extractPublicServicesPage(data)
        } as any)
      );
    } else {
      yield put(actions.getPublicServicesFailed(''));
    }
  } catch (e) {
    yield put(actions.getPublicServicesFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_PUBLIC_SERVICES_REQUESTED, getPublicServicesRequested)
  ]);
}
