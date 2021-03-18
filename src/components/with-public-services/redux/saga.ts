import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  GET_PUBLIC_SERVICES_REQUESTED,
  GET_PUBLIC_SERVICES_RELATIONS_REQUESTED
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
    const data = yield call(
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
  } catch (e) {
    yield put(actions.getPublicServicesFailed(e.message));
  }
}

function* getPublicServicesRelationsRequested({
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
      requiredByServiceUri,
      relatedByServiceUri,
      isDescribedAt,
      isClassifiedBy,
      requiresOrRelates
    }
  }
}: ReturnType<typeof actions.getPublicServicesRelationsRequested>) {
  try {
    const data = yield call(
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
        requiredByServiceUri,
        relatedByServiceUri,
        isDescribedAt,
        isClassifiedBy,
        requiresOrRelates
      })
    );

    if (data) {
      yield put(
        actions.getPublicServicesRelationsSucceeded(
          extractPublicServices(data) as PublicService[]
        )
      );
    } else {
      yield put(actions.getPublicServicesRelationsFailed(''));
    }
  } catch (e) {
    yield put(actions.getPublicServicesRelationsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_PUBLIC_SERVICES_REQUESTED, getPublicServicesRequested),
    takeLatest(
      GET_PUBLIC_SERVICES_RELATIONS_REQUESTED,
      getPublicServicesRelationsRequested
    )
  ]);
}
