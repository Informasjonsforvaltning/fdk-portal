import { all, call, put, takeEvery } from 'redux-saga/effects';

import { GET_AI_PROJECTS_REQUESTED } from './action-types';
import * as actions from './actions';

import { getAiProjects } from '../../../api/ai-projects-api/projects';

function* getAiProjectsRequested() {
  try {
    const data: any[] = yield call(getAiProjects);

    if (data) {
      yield put(actions.getAiProjectsSucceeded(data));
    } else {
      yield put(actions.getAiProjectsFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getAiProjectsFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeEvery(GET_AI_PROJECTS_REQUESTED, getAiProjectsRequested)]);
}
