import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_DATASETS_REQUESTED } from './action-types';
import * as actions from './actions';

import {
  extractDatasets,
  searchDatasets
} from '../../../api/search-api/datasets';

import type { SearchObject } from '../../../types';
import { paramsToSearchBody } from '../../../utils/common';

function* getDatasetsRequested({
  payload: { params: { uri, size, orgPath } = {} }
}: ReturnType<typeof actions.getDatasetsRequested>) {
  try {
    const data: Record<string, any> = yield call(
      searchDatasets,
      paramsToSearchBody({
        size,
        filters: {
          uri,
          orgPath
        }
      })
    );

    if (data) {
      yield put(
        actions.getDatasetsSucceeded(extractDatasets(data) as SearchObject[])
      );
    } else {
      yield put(actions.getDatasetsFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getDatasetsFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_DATASETS_REQUESTED, getDatasetsRequested)]);
}
