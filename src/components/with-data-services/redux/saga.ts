import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { getConfig } from '../../../config';

import { GET_DATA_SERVICES_REQUESTED } from './action-types';
import * as actions from './actions';

import { DataService } from '../../../types';

function* getDataServicesRequested({
  payload: { params }
}: ReturnType<typeof actions.getDataServicesRequested>) {
  try {
    const { data, errors } = yield call(
      axios.get,
      `${getConfig().conceptApi.host}/api/apis`,
      {
        headers: { accept: 'application/json' },
        params
      }
    );
    if (data?.hits) {
      yield put(actions.getDataServicesSucceeded(data?.hits as DataService[]));
    } else {
      yield put(actions.getDataServicesFailed(JSON.stringify(errors)));
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
