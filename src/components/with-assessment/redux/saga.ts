import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getConfig } from '../../../config';

import {
  GET_ASSESSMENT_REQUESTED,
  GET_ASSESSMENTS_REQUESTED,
  GET_CATALOG_RATING_REQUESTED,
  LOAD_MORE_ASSESSMENTS_REQUESTED
} from './action-types';
import * as actions from './actions';

import type { Assessment, PagedAssessments, Rating } from '../../../types';

function* getAssessmentRequested({
  payload: { id }
}: ReturnType<typeof actions.getAssessmentRequested>) {
  try {
    const { data } = yield call(
      axios.get,
      `${
        getConfig().metadataQualityAssessmentApi.host
      }/assessments/entities/${id}`
    );

    if (data) {
      yield put(actions.getAssessmentSucceeded(data as Assessment));
    } else {
      yield put(actions.getAssessmentFailed(''));
    }
  } catch (e) {
    yield put(actions.getAssessmentFailed(e.message));
  }
}

function* getCatalogRatingRequested({
  payload: { catalogId, entityType, context }
}: ReturnType<typeof actions.getCatalogRatingRequested>) {
  try {
    const { data } = yield call(
      axios.get,
      `${getConfig().metadataQualityAssessmentApi.host}/rating/catalog`,
      {
        params: {
          catalogId,
          entityType,
          context
        }
      }
    );

    if (data) {
      yield put(actions.getCatalogRatingSucceeded(data as Rating));
    } else {
      yield put(actions.getCatalogRatingFailed(''));
    }
  } catch (e) {
    yield put(actions.getCatalogRatingFailed(e.message));
  }
}

function* getPagedAssessmentsRequested({
  payload: { catalogId, entityType, context, page }
}: ReturnType<typeof actions.getPagedAssessmentsRequested>) {
  try {
    const { data } = yield call(
      axios.get,
      `${getConfig().metadataQualityAssessmentApi.host}/assessments/entities`,
      {
        params: {
          catalogId,
          entityType,
          context,
          page
        }
      }
    );

    if (data) {
      yield put(actions.getPagedAssessmentsSucceeded(data as PagedAssessments));
    } else {
      yield put(actions.getPagedAssessmentsFailed(''));
    }
  } catch (e) {
    yield put(actions.getPagedAssessmentsFailed(e.message));
  }
}

function* loadMoreAssessmentsRequested({
  payload: { catalogId, entityType, context, page }
}: ReturnType<typeof actions.loadMoreAssessmentsRequested>) {
  try {
    const { data } = yield call(
      axios.get,
      `${getConfig().metadataQualityAssessmentApi.host}/assessments/entities`,
      {
        params: {
          catalogId,
          entityType,
          context,
          page
        }
      }
    );

    if (data) {
      yield put(actions.loadMoreAssessmentsSucceeded(data as PagedAssessments));
    } else {
      yield put(actions.loadMoreAssessmentsFailed(''));
    }
  } catch (e) {
    yield put(actions.loadMoreAssessmentsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_ASSESSMENT_REQUESTED, getAssessmentRequested),
    takeLatest(GET_CATALOG_RATING_REQUESTED, getCatalogRatingRequested),
    takeLatest(GET_ASSESSMENTS_REQUESTED, getPagedAssessmentsRequested),
    takeLatest(LOAD_MORE_ASSESSMENTS_REQUESTED, loadMoreAssessmentsRequested)
  ]);
}
