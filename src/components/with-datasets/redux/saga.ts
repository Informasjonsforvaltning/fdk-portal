import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_DATASETS_REQUESTED } from './action-types';
import * as actions from './actions';

import { datasetsSearch } from '../../../api/datasets';

import { Dataset } from '../../../types';

function* getDatasetsRequested({
  payload: {
    params: { uris }
  }
}: ReturnType<typeof actions.getDatasetsRequested>) {
  if (!uris) {
    return;
  }

  try {
    const data = yield call(datasetsSearch, { uris });
    const datasets = data?.hits?.hits.map(({ _source }: any) => _source);
    if (datasets) {
      yield put(actions.getDatasetsSucceeded(datasets as Dataset[]));
    } else {
      yield put(actions.getDatasetsFailed(''));
    }
  } catch (e) {
    yield put(actions.getDatasetsFailed(e.message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_DATASETS_REQUESTED, getDatasetsRequested)]);
}
