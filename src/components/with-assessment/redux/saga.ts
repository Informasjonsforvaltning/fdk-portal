import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { getConfig } from '../../../config';

import { GET_ASSESSMENT_REQUESTED } from './action-types';
import * as actions from './actions';

import type { Assessment } from '../../../types';

function* getAssessmentRequested({
  payload: { uri }
}: ReturnType<typeof actions.getAssessmentRequested>) {
  try {
    const { data } = yield call(
      axios.get,
      getConfig().metadataQualityAssessmentApi.host,
      {
        params: {
          entityUri: uri
        }
      }
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

export default function* saga() {
  yield all([takeLatest(GET_ASSESSMENT_REQUESTED, getAssessmentRequested)]);
}
