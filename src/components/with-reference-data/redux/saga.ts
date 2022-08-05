import { all, call, put, takeEvery } from 'redux-saga/effects';

import { GET_REFERENCE_DATA_REQUESTED } from './action-types';
import * as actions from './actions';

import { getNewReferenceData } from '../../../api/referenceData';
import { ReferenceData } from '../../../types';

const endpoint = (category: keyof ReferenceData) => {
  switch (category) {
    case 'apispecifications':
      return 'api-specifications';
    case 'referencetypes':
      return 'reference-types';
    case 'los':
      return 'los/themes-and-words';
    case 'themes':
      return 'eu/data-themes';
    default:
      throw Error('Category not implemented');
  }
};

function* getReferenceDataRequested({
  payload: { category }
}: ReturnType<typeof actions.getReferenceDataRequested>) {
  try {
    const data: any[] = yield call(
      getNewReferenceData,
      `${endpoint(category)}`
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
