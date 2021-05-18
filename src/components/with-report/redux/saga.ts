import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_DATASETS_REPORT_REQUESTED } from './action-types';
import * as actions from './actions';

import { getDatasetsReport } from '../../../api/report-api/reports';

import type { DatasetsReport } from '../../../types';

function* getDatasetsReportRequested({
  payload: { params }
}: ReturnType<typeof actions.getDatasetsReportRequested>) {
  try {
    const data: DatasetsReport = yield call(getDatasetsReport, params);

    if (data) {
      yield put(actions.getDatasetsReportSucceeded(data as DatasetsReport));
    } else {
      yield put(actions.getDatasetsReportFailed(''));
    }
  } catch (e) {
    yield put(actions.getDatasetsReportFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_DATASETS_REPORT_REQUESTED, getDatasetsReportRequested)
  ]);
}
