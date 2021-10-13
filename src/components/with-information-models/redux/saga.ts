import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  GET_INFORMATION_MODELS_REQUESTED,
  GET_INFORMATION_MODELS_RELATIONS_REQUESTED
} from './action-types';
import * as actions from './actions';

import {
  searchInformationModels,
  paramsToSearchBody,
  extractInformationModels
} from '../../../api/search-fulltext-api/informationmodels';

import type { InformationModel } from '../../../types';

function* getInformationModelsRequested({
  payload: {
    params: {
      conceptIdentifiers,
      informationModelIdentifiers,
      hasFormat,
      size,
      relations
    } = {}
  }
}: ReturnType<typeof actions.getInformationModelsRequested>) {
  try {
    const data: Record<string, any> = yield call(
      searchInformationModels,
      paramsToSearchBody({
        conceptIdentifiers,
        informationModelIdentifiers,
        hasFormat,
        size,
        relations
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
  } catch (e: any) {
    yield put(actions.getInformationModelsFailed(e.message));
  }
}

function* getInformationModelsRelationsRequested({
  payload: {
    params: {
      conceptIdentifiers,
      informationModelIdentifiers,
      size,
      relations
    } = {}
  }
}: ReturnType<typeof actions.getInformationModelsRelationsRequested>) {
  try {
    const data: Record<string, any> = yield call(
      searchInformationModels,
      paramsToSearchBody({
        conceptIdentifiers,
        informationModelIdentifiers,
        size,
        relations
      })
    );

    if (data) {
      yield put(
        actions.getInformationModelsRelationsSucceeded(
          extractInformationModels(data) as InformationModel[]
        )
      );
    } else {
      yield put(actions.getInformationModelsRelationsFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getInformationModelsRelationsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_INFORMATION_MODELS_REQUESTED, getInformationModelsRequested),
    takeLatest(
      GET_INFORMATION_MODELS_RELATIONS_REQUESTED,
      getInformationModelsRelationsRequested
    )
  ]);
}
