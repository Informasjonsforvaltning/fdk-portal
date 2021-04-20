import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getConfig } from '../../../config';

import {
  GET_ASSESSMENT_REQUESTED,
  GET_CATALOG_RATING_REQUESTED
} from './action-types';
import * as actions from './actions';

import type { Assessment, Rating } from '../../../types';

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

export default function* saga() {
  yield all([
    takeLatest(GET_ASSESSMENT_REQUESTED, getAssessmentRequested),
    takeLatest(GET_CATALOG_RATING_REQUESTED, getCatalogRatingRequested)
  ]);
}
