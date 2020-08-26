import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_DATASETSSTATISTICS_REQUESTED } from './action-types';
import * as actions from './actions';

import { getDatasetsReport } from '../../../api/report-api/reports';

import type { DatasetsReport } from '../../../types';

function* getDatasetsStatisticsRequested({
  payload: { id }
}: ReturnType<typeof actions.getDatasetsStatisticsRequested>) {
  try {
    const datasetsStatistics = yield call(getDatasetsReport, id);

    if (datasetsStatistics) {
      yield put(
        actions.getDatasetsStatisticsSucceeded(
          datasetsStatistics as DatasetsReport
        )
      );
    } else {
      yield put(actions.getDatasetsStatisticsFailed(''));
    }
  } catch (e) {
    yield put(actions.getDatasetsStatisticsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_DATASETSSTATISTICS_REQUESTED, getDatasetsStatisticsRequested)
  ]);
}
