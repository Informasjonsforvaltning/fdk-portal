import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_ORGANIZATIONS_CATALOG_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  getOrganizations,
  extractOrganizations
} from '../../../api/organization-catalogs-api/organizations';

function* getOrganizationsFromCatalogRequested() {
  try {
    const data: Record<string, any> = yield call(getOrganizations);
    const organizations = extractOrganizations(data);

    if (organizations) {
      yield put(actions.getOrganizationsCatalogSucceeded(organizations as any));
    } else {
      yield put(actions.getOrganizationsCatalogFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getOrganizationsCatalogFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(
      GET_ORGANIZATIONS_CATALOG_REQUESTED,
      getOrganizationsFromCatalogRequested
    )
  ]);
}
