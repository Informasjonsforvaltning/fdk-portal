import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_DATA_SERVICES_REQUESTED } from './action-types';
import * as actions from './actions';

import { apisSearch } from '../../../api/apis';

import { DataService } from '../../../types';

function* getDataServicesRequested({
  payload: {
    params: { dataseturi }
  }
}: ReturnType<typeof actions.getDataServicesRequested>) {
  if (!dataseturi) {
    return;
  }

  try {
    const data = yield call(apisSearch, { dataseturi });
    if (data?.hits) {
      yield put(actions.getDataServicesSucceeded(data?.hits as DataService[]));
    } else {
      yield put(actions.getDataServicesFailed(''));
    }
  } catch (e) {
    yield put(actions.getDataServicesFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_DATA_SERVICES_REQUESTED, getDataServicesRequested)
  ]);
}
