import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  GET_PUBLIC_SERVICES_REQUESTED,
  GET_PUBLIC_SERVICES_REQUIRED_BY_REQUESTED
} from './action-types';
import * as actions from './actions';
import type { PublicService } from '../../../types';

import {
  extractPublicServices,
  extractPublicServicesAggregations,
  extractPublicServicesPage,
  paramsToSearchBody,
  searchPublicServices
} from '../../../api/search-fulltext-api/public-services';

function* getPublicServicesRequested({
  payload: {
    params: {
      size,
      q,
      orgPath,
      isGroupedBy,
      keywords,
      publicServiceIdentifiers
    }
  }
}: ReturnType<typeof actions.getPublicServicesRequested>) {
  try {
    const data = yield call(
      searchPublicServices,
      paramsToSearchBody({
        size,
        q,
        orgPath,
        isGroupedBy,
        keywords,
        publicServiceIdentifiers
      })
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

function* getPublicServicesRequiredByRequested({
  payload: {
    params: { requiredByServiceUri, size }
  }
}: ReturnType<typeof actions.getPublicServicesRequiredByRequested>) {
  try {
    const data = yield call(
      searchPublicServices,
      paramsToSearchBody({
        requiredByServiceUri,
        size
      })
    );

    if (data) {
      yield put(
        actions.getPublicServicesRequiredBySucceeded(
          extractPublicServices(data) as PublicService[]
        )
      );
    } else {
      yield put(actions.getPublicServicesRequiredByFailed(''));
    }
  } catch (e) {
    yield put(actions.getPublicServicesRequiredByFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_PUBLIC_SERVICES_REQUESTED, getPublicServicesRequested),
    takeLatest(
      GET_PUBLIC_SERVICES_REQUIRED_BY_REQUESTED,
      getPublicServicesRequiredByRequested
    )
  ]);
}
