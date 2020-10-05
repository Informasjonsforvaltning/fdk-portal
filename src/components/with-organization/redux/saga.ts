import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  GET_ORGANIZATION_REQUESTED,
  GET_CATALOG_RATING_REQUESTED,
  GET_ORGANIZATION_DATASETS_REQUESTED,
  LOAD_MORE_ORGANIZATION_DATASETS_REQUESTED,
  GET_ORGANIZATION_DATASET_REQUESTED
} from './action-types';
import * as actions from './actions';

import { getOrganization as getOrganizationFromCatalog } from '../../../api/organization-catalogs-api/organizations';
import {
  getOrganization as getOrganizationData,
  getOrganizationDatasets,
  getOrganizationDataset
} from '../../../api/organizations-api/organizations';

import type { Dataset, Publisher, Rating } from '../../../types';

function* getOrganizationRequested({
  payload: { id }
}: ReturnType<typeof actions.getOrganizationRequested>) {
  try {
    const organization = yield call(getOrganizationFromCatalog, id);

    if (organization) {
      yield put(actions.getOrganizationSucceeded(organization as Publisher));
    } else {
      yield put(actions.getOrganizationFailed(''));
    }
  } catch (e) {
    yield put(actions.getOrganizationFailed(e.message));
  }
}

function* getCatalogRatingRequested({
  payload: { id }
}: ReturnType<typeof actions.getCatalogRatingRequested>) {
  try {
    const data = yield call(getOrganizationData, id);

    if (data?.datasets?.hits && data?.catalogRating) {
      yield put(
        actions.getCatalogRatingSucceeded(
          data.datasets.hits as Dataset[],
          data.catalogRating as Rating
        )
      );
    } else {
      yield put(actions.getCatalogRatingFailed(''));
    }
  } catch (e) {
    yield put(actions.getCatalogRatingFailed(e.message));
  }
}

function* getOrganizationDatasetsRequested({
  payload: { id }
}: ReturnType<typeof actions.getOrganizationDatasetsRequested>) {
  try {
    const data = yield call(getOrganizationDatasets, id);

    if (data?.hits && data?.catalogRating && data?.page) {
      yield put(
        actions.getOrganizationDatasetsSucceeded(
          data.hits as Dataset[],
          data.catalogRating as Rating,
          data.page.currentPage + 1 < data.page.totalPages,
          data.page.size,
          data.page.totalElements
        )
      );
    } else {
      yield put(actions.getOrganizationDatasetsFailed(''));
    }
  } catch (e) {
    yield put(actions.getOrganizationDatasetsFailed(e.message));
  }
}

function* loadMoreOrganizationDatasetsRequested({
  payload: { id, page }
}: ReturnType<typeof actions.loadMoreOrganizationDatasetsRequested>) {
  try {
    const data = yield call(getOrganizationDatasets, id, page);

    if (data?.hits && data?.catalogRating && data?.page) {
      yield put(
        actions.loadMoreOrganizationDatasetsSucceeded(
          data.hits as Dataset[],
          data.catalogRating as Rating,
          data.page.currentPage,
          data.page.currentPage + 1 < data.page.totalPages
        )
      );
    } else {
      yield put(actions.loadMoreOrganizationDatasetsFailed(''));
    }
  } catch (e) {
    yield put(actions.loadMoreOrganizationDatasetsFailed(e.message));
  }
}

function* getOrganizationDatasetRequested({
  payload: { organizationId, datasetId }
}: ReturnType<typeof actions.getOrganizationDatasetRequested>) {
  try {
    const data = yield call(getOrganizationDataset, organizationId, datasetId);

    if (data?.dataset) {
      yield put(
        actions.getOrganizationDatasetSucceeded(data.dataset as Dataset)
      );
    } else {
      yield put(actions.getOrganizationDatasetFailed(''));
    }
  } catch (e) {
    yield put(actions.getOrganizationDatasetFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_ORGANIZATION_REQUESTED, getOrganizationRequested),
    takeLatest(GET_CATALOG_RATING_REQUESTED, getCatalogRatingRequested),
    takeLatest(
      GET_ORGANIZATION_DATASETS_REQUESTED,
      getOrganizationDatasetsRequested
    ),
    takeLatest(
      LOAD_MORE_ORGANIZATION_DATASETS_REQUESTED,
      loadMoreOrganizationDatasetsRequested
    ),
    takeLatest(
      GET_ORGANIZATION_DATASET_REQUESTED,
      getOrganizationDatasetRequested
    )
  ]);
}
