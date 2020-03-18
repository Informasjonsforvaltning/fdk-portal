import { all } from 'redux-saga/effects';

import referenceDataSaga from '../components/with-reference-data/redux/saga';

export default function* saga() {
  yield all([referenceDataSaga()]);
}
