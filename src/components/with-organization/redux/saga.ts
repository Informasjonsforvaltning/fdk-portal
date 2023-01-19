import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  GET_ORGANIZATION_REQUESTED,
  GET_ENHETSREGISTERET_ORGANIZATION_REQUESTED,
  GET_ORGANIZATION_RATING_REQUESTED
} from './action-types';
import * as actions from './actions';

import { getOrganization as getOrganizationFromCatalog } from '../../../api/organization-catalogs-api/organizations';
import { getOrganization as getOrganizationData } from '../../../api/organizations-api/organizations';
import { getEnhetsregisteretOrganization } from './operations';

import type {
  Organization,
  OrganizationCountsAndRating,
  EnhetsregisteretOrganization
} from '../../../types';

function* getOrganizationRequested({
  payload: { id }
}: ReturnType<typeof actions.getOrganizationRequested>) {
  try {
    const organization: Organization = yield call(
      getOrganizationFromCatalog,
      id
    );

    if (organization && typeof organization === 'object') {
      yield put(actions.getOrganizationSucceeded(organization as Organization));
    } else {
      yield put(actions.getOrganizationFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getOrganizationFailed(e.message));
  }
}

function* getEnhetsregisteretOrganizationRequested({
  payload: { id }
}: ReturnType<typeof actions.getEnhetsregisteretOrganizationRequested>) {
  try {
    const { data } = yield call(getEnhetsregisteretOrganization, id);

    if (data) {
      yield put(
        actions.getEnhetsregisteretOrganizationSucceeded(
          data as EnhetsregisteretOrganization
        )
      );
    } else {
      yield put(actions.getEnhetsregisteretOrganizationFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getEnhetsregisteretOrganizationFailed(e.message));
  }
}

function* getOrganizationRatingRequested({
  payload: { id, filter }
}: ReturnType<typeof actions.getOrganizationRatingRequested>) {
  try {
    const data: OrganizationCountsAndRating = yield call(
      getOrganizationData,
      id,
      filter
    );

    if (data) {
      yield put(
        actions.getOrganizationRatingSucceeded(
          data as OrganizationCountsAndRating
        )
      );
    } else {
      yield put(actions.getOrganizationRatingFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getOrganizationRatingFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_ORGANIZATION_REQUESTED, getOrganizationRequested),
    takeLatest(
      GET_ENHETSREGISTERET_ORGANIZATION_REQUESTED,
      getEnhetsregisteretOrganizationRequested
    ),
    takeLatest(
      GET_ORGANIZATION_RATING_REQUESTED,
      getOrganizationRatingRequested
    )
  ]);
}
