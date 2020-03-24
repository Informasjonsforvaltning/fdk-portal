import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { getConfig } from '../../../config';

import { GET_DATASETS_REQUESTED } from './action-types';
import * as actions from './actions';

import { Dataset } from '../../../types';

function* getDatasetsRequested({
  payload: { params }
}: ReturnType<typeof actions.getDatasetsRequested>) {
  try {
    const { data, errors } = yield call(
      axios.get,
      `${getConfig().datasetApi.host}/api/datasets`,
      {
        headers: { accept: 'application/json' },
        params
      }
    );
    const datasets = data?.hits?.hits.map(({ _source }: any) => _source);
    if (datasets) {
      yield put(actions.getDatasetsSucceeded(datasets as Dataset[]));
    } else {
      yield put(actions.getDatasetsFailed(JSON.stringify(errors)));
    }
  } catch (e) {
    yield put(actions.getDatasetsFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_DATASETS_REQUESTED, getDatasetsRequested)]);
}
