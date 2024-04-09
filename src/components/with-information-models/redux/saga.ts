import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_INFORMATION_MODELS_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  searchInformationModels,
  extractInformationModels
} from '../../../api/search-api/informationmodels';

import type { SearchObject } from '../../../types';
import { paramsToSearchBody } from '../../../utils/common';

function* getInformationModelsRequested({
  payload: { params: { uri, size, relations } = {} }
}: ReturnType<typeof actions.getInformationModelsRequested>) {
  try {
    const data: Record<string, any> = yield call(
      searchInformationModels,
      paramsToSearchBody({
        uri,
        size,
        relations
      })
    );

    if (data) {
      yield put(
        actions.getInformationModelsSucceeded(
          extractInformationModels(data) as SearchObject[]
        )
      );
    } else {
      yield put(actions.getInformationModelsFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getInformationModelsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_INFORMATION_MODELS_REQUESTED, getInformationModelsRequested)
  ]);
}
