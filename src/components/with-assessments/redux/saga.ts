import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getConfig } from '../../../config';

import {
  GET_ASSESSMENTS_REQUESTED,
  LOAD_MORE_ASSESSMENTS_REQUESTED
} from './action-types';
import * as actions from './actions';

import type { Assessment, Paged } from '../../../types';

function* getPagedAssessmentsRequested({
  payload: { catalogId, entityType, contexts, page }
}: ReturnType<typeof actions.getPagedAssessmentsRequested>) {
  try {
    const { data } = yield call(
      axios.get,
      `${getConfig().metadataQualityAssessmentApi.host}/assessments/entities`,
      {
        params: {
          catalogId,
          entityType,
          contexts,
          page
        }
      }
    );

    if (data) {
      yield put(
        actions.getPagedAssessmentsSucceeded(data as Paged<Assessment>)
      );
    } else {
      yield put(actions.getPagedAssessmentsFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getPagedAssessmentsFailed(e.message));
  }
}

function* loadMoreAssessmentsRequested({
  payload: { catalogId, entityType, contexts, page }
}: ReturnType<typeof actions.loadMoreAssessmentsRequested>) {
  try {
    const { data } = yield call(
      axios.get,
      `${getConfig().metadataQualityAssessmentApi.host}/assessments/entities`,
      {
        params: {
          catalogId,
          entityType,
          contexts,
          page
        }
      }
    );

    if (data) {
      yield put(
        actions.loadMoreAssessmentsSucceeded(data as Paged<Assessment>)
      );
    } else {
      yield put(actions.loadMoreAssessmentsFailed(''));
    }
  } catch (e: any) {
    yield put(actions.loadMoreAssessmentsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_ASSESSMENTS_REQUESTED, getPagedAssessmentsRequested),
    takeLatest(LOAD_MORE_ASSESSMENTS_REQUESTED, loadMoreAssessmentsRequested)
  ]);
}
