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
  Publisher,
  OrgRating,
  EnhetsregisteretOrganization
} from '../../../types';

function* getOrganizationRequested({
  payload: { id }
}: ReturnType<typeof actions.getOrganizationRequested>) {
  try {
    const organization = yield call(getOrganizationFromCatalog, id);

    if (organization && typeof organization === 'object') {
      yield put(actions.getOrganizationSucceeded(organization as Publisher));
    } else {
      yield put(actions.getOrganizationFailed(''));
    }
  } catch (e) {
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
  } catch (e) {
    yield put(actions.getEnhetsregisteretOrganizationFailed(e.message));
  }
}

function* getOrganizationRatingRequested({
  payload: { id }
}: ReturnType<typeof actions.getOrganizationRatingRequested>) {
  try {
    const data = yield call(getOrganizationData, id);

    if (data) {
      yield put(actions.getOrganizationRatingSucceeded(data as OrgRating));
    } else {
      yield put(actions.getOrganizationRatingFailed(''));
    }
  } catch (e) {
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
