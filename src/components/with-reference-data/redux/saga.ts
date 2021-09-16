import { all, call, put, takeEvery } from 'redux-saga/effects';

import { GET_REFERENCE_DATA_REQUESTED } from './action-types';
import * as actions from './actions';

import { getReferenceData } from '../../../api/referenceData';

import type { ReferenceType } from '../../../types';

function* getReferenceDataRequested({
  payload: { category }
}: ReturnType<typeof actions.getReferenceDataRequested>) {
  try {
    const codes = [
      'referencetypes',
      'mediatypes',
      'linguisticsystem',
      'apiservicetype'
    ];

    const data: ReferenceType[] = yield call(
      getReferenceData,
      codes.includes(category) ? `codes/${category}` : category
    );

    if (data) {
      yield put(actions.getReferenceDataSucceeded(category, data));
    } else {
      yield put(actions.getReferenceDataFailed(''));
    }
  } catch (e: any) {
    yield put(actions.getReferenceDataFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeEvery(GET_REFERENCE_DATA_REQUESTED, getReferenceDataRequested)
  ]);
}
