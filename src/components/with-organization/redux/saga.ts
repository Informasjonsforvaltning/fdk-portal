import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_ORGANIZATION_REQUESTED } from './action-types';
import * as actions from './actions';

import { getOrganization } from '../../../api/organization-catalogs-api/organizations';

import type { Publisher } from '../../../types';

function* getOrganizationRequested({
  payload: { id }
}: ReturnType<typeof actions.getOrganizationRequested>) {
  try {
    const organization = yield call(getOrganization, id);

    if (organization) {
      yield put(actions.getOrganizationSucceeded(organization as Publisher));
    } else {
      yield put(actions.getOrganizationFailed(''));
    }
  } catch (e) {
    yield put(actions.getOrganizationFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_ORGANIZATION_REQUESTED, getOrganizationRequested)]);
}
