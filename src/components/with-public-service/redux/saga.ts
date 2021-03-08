import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_PUBLIC_SERVICE_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  extractFirstPublicService,
  searchPublicServices,
  paramsToSearchBody
} from '../../../api/search-fulltext-api/public-services';

import { PublicService } from '../../../types';

function* getPublicServiceRequested({
  payload: { id }
}: ReturnType<typeof actions.getPublicServiceRequested>) {
  try {
    const data = yield call(searchPublicServices, paramsToSearchBody({ id }));
    const publicService = extractFirstPublicService(data) as PublicService;

    if (publicService) {
      yield put(actions.getPublicServiceSucceeded(publicService));
    } else {
      yield put(actions.getPublicServiceFailed(''));
    }
  } catch (e) {
    yield put(actions.getPublicServiceFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_PUBLIC_SERVICE_REQUESTED, getPublicServiceRequested)
  ]);
}
