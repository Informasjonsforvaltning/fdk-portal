import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getConfig } from '../../../config';

import { GET_DATASET_SCORES_REQUESTED } from './action-types';
import * as actions from './actions';

import type { DatasetScores } from '../../../types';

function* getDatasetScoreRequested({
  payload: { request }
}: ReturnType<typeof actions.getDatasetScoresRequested>) {
  try {
    const { data } = yield call(
      axios.post,
      `${getConfig().metadataQualityAssessmentApi.host}/api/scores`,
      request
    );

    if (data) {
      yield put(actions.getDatasetScoresSucceeded(data as DatasetScores));
    } else {
      yield put(actions.getDatasetScoresFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getDatasetScoresFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_DATASET_SCORES_REQUESTED, getDatasetScoreRequested)
  ]);
}
