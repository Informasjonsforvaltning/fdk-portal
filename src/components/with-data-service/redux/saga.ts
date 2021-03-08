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
    const dataService = extractFirstDataService(data) as DataService;

    if (dataService) {
      yield put(actions.getDataServiceSucceeded(dataService));
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
