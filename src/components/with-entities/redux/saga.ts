import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_ENTITIES_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  extractEntities,
  getRecentEntities
} from '../../../api/search-fulltext-api/all-entities';

function* getEntitiesRequested() {
  try {
    const data = yield call(getRecentEntities);
    const entities = extractEntities(data);
    if (entities) {
      yield put(actions.getEntitiesSucceeded(entities as any));
    } else {
      yield put(actions.getEntitiesFailed(''));
    }
  } catch (e) {
    yield put(actions.getEntitiesFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_ENTITIES_REQUESTED, getEntitiesRequested)]);
}
