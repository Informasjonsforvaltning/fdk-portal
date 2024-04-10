import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_DATA_SERVICES_REQUESTED } from './action-types';
import * as actions from './actions';

import { searchDataServices } from '../../../api/search-api/dataservices';

import type { SearchObject } from '../../../types';
import { paramsToSearchBody } from '../../../utils/common';

function* getDataServicesRequested({
  payload: {
    params: { size, uri }
  }
}: ReturnType<typeof actions.getDataServicesRequested>) {
  try {
    const body = paramsToSearchBody({
      size,
      filters: { uri }
    });
    const data: Record<string, any> = yield call(searchDataServices, body);
    if (data?.hits) {
      yield put(actions.getDataServicesSucceeded(data?.hits as SearchObject[]));
    } else {
      yield put(actions.getDataServicesFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getDataServicesFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_DATA_SERVICES_REQUESTED, getDataServicesRequested)
  ]);
}
