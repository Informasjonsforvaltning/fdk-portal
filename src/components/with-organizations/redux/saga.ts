import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_ORGANIZATIONS_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  getOrganizations,
  extractOrganizations
} from '../../../api/organizations-api/organizations';

function* getOrganizationsRequested({
  payload: { filter }
}: ReturnType<typeof actions.getOrganizationsRequested>) {
  try {
    const data = yield call(getOrganizations, filter);
    const organizations = extractOrganizations(data);

    if (organizations) {
      yield put(actions.getOrganizationsSucceeded(organizations as any));
    } else {
      yield put(actions.getOrganizationsFailed(''));
    }
  } catch (e) {
    yield put(actions.getOrganizationsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_ORGANIZATIONS_REQUESTED, getOrganizationsRequested)
  ]);
}
