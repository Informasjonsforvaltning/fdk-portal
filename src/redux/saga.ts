import { all } from 'redux-saga/effects';

import datasetSaga from '../components/with-dataset/redux/saga';
import referenceDataSaga from '../components/with-reference-data/redux/saga';

export default function* saga() {
  yield all([datasetSaga(), referenceDataSaga()]);
}
