import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_PUBLIC_SERVICES_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  extractPublicServices,
  extractPublicServicesAggregations,
  extractPublicServicesPage,
  searchPublicServices
} from '../../../api/search-api/public-services';

import { paramsToSearchBody } from '../../../utils/common';

function* getPublicServicesRequested({
  payload: {
    params: {
      page,
      sortfield,
      size,
      q,
      orgPath,
      isGroupedBy,
      keywords,
      publicServiceIdentifiers,
      isDescribedAt,
      isClassifiedBy,
      requiresOrRelates
    }
  }
}: ReturnType<typeof actions.getPublicServicesRequested>) {
  try {
    const data: Record<string, any> = yield call(
      searchPublicServices,
      paramsToSearchBody({
        page,
        sortfield,
        size,
        q,
        orgPath,
        isGroupedBy,
        keywords,
        publicServiceIdentifiers,
        isDescribedAt,
        isClassifiedBy,
        requiresOrRelates
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
  } catch (e: any) {
    yield put(actions.getPublicServicesFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_PUBLIC_SERVICES_REQUESTED, getPublicServicesRequested)
  ]);
}
