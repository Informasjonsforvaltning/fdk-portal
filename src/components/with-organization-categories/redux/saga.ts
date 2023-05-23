import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_ORGANIZATION_CATEGORIES_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  getOrganizationCategories,
  extractOrganizationCategories
} from '../../../api/organizations-api/organizations-categories';

function* getOrganizationCategoriesRequested({
  payload: { type, includeEmpty }
}: ReturnType<typeof actions.getOrganizationCategoriesRequested>) {
  try {
    const data: Record<string, any> = yield call(
      getOrganizationCategories,
      type,
      includeEmpty
    );
    const organizationCategories = extractOrganizationCategories(data);

    if (organizationCategories) {
      yield put(
        actions.getOrganizationCategoriesSucceeded(
          organizationCategories as any
        )
      );
    } else {
      yield put(actions.getOrganizationCategoriesFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getOrganizationCategoriesFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(
      GET_ORGANIZATION_CATEGORIES_REQUESTED,
      getOrganizationCategoriesRequested
    )
  ]);
}
