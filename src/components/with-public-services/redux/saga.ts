import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  GET_PUBLIC_SERVICES_REQUESTED,
  GET_PUBLIC_SERVICES_REQUIRED_BY_REQUESTED,
  GET_PUBLIC_SERVICES_RELATED_BY_REQUESTED,
  GET_PUBLIC_SERVICES_RELATIONS_REQUESTED
} from './action-types';
import * as actions from './actions';

import {
  extractPublicServices,
  extractPublicServicesAggregations,
  extractPublicServicesPage,
  paramsToSearchBody,
  searchPublicServices
} from '../../../api/search-fulltext-api/public-services';

import type { PublicService } from '../../../types';

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
    const data: Record<string, any> = yield call(
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

function* getPublicServicesRelatedByRequested({
  payload: {
    params: { relatedByServiceUri, size }
  }
}: ReturnType<typeof actions.getPublicServicesRelatedByRequested>) {
  try {
    const data: Record<string, any> = yield call(
      searchPublicServices,
      paramsToSearchBody({
        relatedByServiceUri,
        size
      })
    );

    if (data) {
      yield put(
        actions.getPublicServicesRelatedBySucceeded(
          extractPublicServices(data) as PublicService[]
        )
      );
    } else {
      yield put(actions.getPublicServicesRelatedByFailed(''));
    }
  } catch (e) {
    yield put(actions.getPublicServicesRelatedByFailed(e.message));
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
      GET_PUBLIC_SERVICES_REQUIRED_BY_REQUESTED,
      getPublicServicesRequiredByRequested
    ),
    takeLatest(
      GET_PUBLIC_SERVICES_RELATED_BY_REQUESTED,
      getPublicServicesRelatedByRequested
    ),
    takeLatest(
      GET_PUBLIC_SERVICES_RELATIONS_REQUESTED,
      getPublicServicesRelationsRequested
    )
  ]);
}
