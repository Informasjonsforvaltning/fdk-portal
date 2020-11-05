import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_DATA_SERVICE_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  searchDataServices,
  paramsToSearchBody,
  extractFirstDataService
} from '../../../api/search-fulltext-api/dataservices';

import type { DataService } from '../../../types';

function* getDataServiceRequested({
  payload: { id }
}: ReturnType<typeof actions.getDataServiceRequested>) {
  try {
    const data = yield call(searchDataServices, paramsToSearchBody({ id }));

    if (data?.hits) {
      yield put(
        actions.getDataServiceSucceeded(
          extractFirstDataService(data) as DataService
        )
      );
    } else {
      yield put(actions.getDataServiceFailed(''));
    }
  } catch (e) {
    yield put(actions.getDataServiceFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_DATA_SERVICE_REQUESTED, getDataServiceRequested)]);
}
