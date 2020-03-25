import { all } from 'redux-saga/effects';

import datasetSaga from '../components/with-dataset/redux/saga';
import referenceDataSaga from '../components/with-reference-data/redux/saga';
import conceptsSaga from '../components/with-concepts/redux/saga';
import datasetsSaga from '../components/with-datasets/redux/saga';
import dataServicesSaga from '../components/with-data-services/redux/saga';

export default function* saga() {
  yield all([
    datasetSaga(),
    referenceDataSaga(),
    conceptsSaga(),
    datasetsSaga(),
    dataServicesSaga()
  ]);
}
