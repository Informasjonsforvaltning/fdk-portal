import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_INFORMATION_MODELS_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  searchInformationModels,
  paramsToSearchBody,
  extractInformationModels
} from '../../../api/search-fulltext-api/informationmodels';

import type { InformationModel } from '../../../types';

function* getInformationModelsRequested({
  payload: { params: { conceptIdentifiers, size } = {} }
}: ReturnType<typeof actions.getInformationModelsRequested>) {
  try {
    const data = yield call(
      searchInformationModels,
      paramsToSearchBody({
        conceptIdentifiers: conceptIdentifiers?.join(),
        size
      })
    );

    if (data) {
      yield put(
        actions.getInformationModelsSucceeded(
          extractInformationModels(data) as InformationModel[]
        )
      );
    } else {
      yield put(actions.getInformationModelsFailed(''));
    }
  } catch (e) {
    yield put(actions.getInformationModelsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_INFORMATION_MODELS_REQUESTED, getInformationModelsRequested)
  ]);
}
