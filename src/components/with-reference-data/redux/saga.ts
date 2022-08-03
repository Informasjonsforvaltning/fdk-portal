import { all, call, put, takeEvery } from 'redux-saga/effects';

import { GET_REFERENCE_DATA_REQUESTED } from './action-types';
import * as actions from './actions';

import { getNewReferenceData } from '../../../api/referenceData';
import { ReferenceData } from '../../../types';

const endpoint = (category: keyof ReferenceData) => {
  if (category === 'apispecifications') {
    return 'api-specifications';
  }
  if (category === 'referencetypes') {
    return 'reference-types';
  }
  if (category === 'mediatypes') {
    return 'iana/media-types';
  }
  if (category === 'linguisticsystem') {
    return 'linguistic-systems';
  }

  throw Error('Category not implemented');
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
