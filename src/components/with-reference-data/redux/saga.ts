import { all, call, put, takeEvery } from 'redux-saga/effects';

import { GET_REFERENCE_DATA_REQUESTED } from './action-types';
import * as actions from './actions';

import { getReferenceData } from '../../../api/referenceData';

function* getReferenceDataRequested({
  payload: { category }
}: ReturnType<typeof actions.getReferenceDataRequested>) {
  try {
    const data = yield call(
      getReferenceData,
      category === 'referencetypes' ? `codes/${category}` : category
    );
    if (data) {
      yield put(actions.getReferenceDataSucceeded(category, data));
    } else {
      yield put(actions.getReferenceDataFailed(''));
    }
  } catch (e) {
    yield put(actions.getReferenceDataFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeEvery(GET_REFERENCE_DATA_REQUESTED, getReferenceDataRequested)
  ]);
}
