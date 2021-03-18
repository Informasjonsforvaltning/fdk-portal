import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  GET_DATASETS_REQUESTED,
  GET_DATASETS_RELATIONS_REQUESTED
} from './action-types';
import * as actions from './actions';

import {
  extractDatasets,
  paramsToSearchBody,
  searchDatasets
} from '../../../api/search-fulltext-api/datasets';

import type { Dataset } from '../../../types';

function* getDatasetsRequested({
  payload: {
    params: {
      uris,
      size,
      orgPath,
      subject,
      info_model,
      referencesSource,
      accessService,
      conformsTo,
      relatedToInfoModel
    } = {}
  }
}: ReturnType<typeof actions.getDatasetsRequested>) {
  try {
    const data = yield call(
      searchDatasets,
      paramsToSearchBody({
        uris,
        size,
        orgPath,
        subject,
        info_model,
        referencesSource,
        accessService,
        conformsTo,
        relatedToInfoModel
      })
    );

    if (data) {
      yield put(
        actions.getDatasetsSucceeded(extractDatasets(data) as Dataset[])
      );
    } else {
      yield put(actions.getDatasetsFailed(''));
    }
  } catch (e) {
    yield put(actions.getDatasetsFailed(e.message));
  }
}

function* getDatasetsRelationsRequested({
  payload: {
    params: {
      uris,
      size,
      orgPath,
      subject,
      info_model,
      referencesSource,
      accessService,
      conformsTo,
      relatedToInfoModel
    } = {}
  }
}: ReturnType<typeof actions.getDatasetsRelationsRequested>) {
  try {
    const data = yield call(
      searchDatasets,
      paramsToSearchBody({
        uris,
        size,
        orgPath,
        subject,
        info_model,
        referencesSource,
        accessService,
        conformsTo,
        relatedToInfoModel
      })
    );

    if (data) {
      yield put(
        actions.getDatasetsRelationsSucceeded(
          extractDatasets(data) as Dataset[]
        )
      );
    } else {
      yield put(actions.getDatasetsRelationsFailed(''));
    }
  } catch (e) {
    yield put(actions.getDatasetsRelationsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_DATASETS_REQUESTED, getDatasetsRequested),
    takeLatest(GET_DATASETS_RELATIONS_REQUESTED, getDatasetsRelationsRequested)
  ]);
}
