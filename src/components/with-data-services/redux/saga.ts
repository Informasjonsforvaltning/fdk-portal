import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_DATA_SERVICES_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  searchDataServices,
  paramsToSearchBody
} from '../../../api/search-fulltext-api/dataservices';

import type { DataService } from '../../../types';

function* getDataServicesRequested({
  payload: {
    params: { dataseturi, size }
  }
}: ReturnType<typeof actions.getDataServicesRequested>) {
  if (!dataseturi) {
    return;
  }

  try {
    const body = paramsToSearchBody({ dataseturi, size });
    const data = yield call(searchDataServices, body);
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
