import {
  GET_DATASETS_REPORT_REQUESTED,
  GET_DATASETS_REPORT_SUCCEEDED,
  GET_DATASETS_REPORT_FAILED,
  RESET_DATASETS_REPORT
} from './action-types';

import type { DatasetsReport } from '../../../types';

export function getDatasetsReportRequested(params: Record<string, unknown>) {
  return {
    type: GET_DATASETS_REPORT_REQUESTED,
    payload: {
      params
    }
  };
}

export function getDatasetsReportSucceeded(report: DatasetsReport) {
  return {
    type: GET_DATASETS_REPORT_SUCCEEDED,
    payload: {
      report
    }
  };
}

export function getDatasetsReportFailed(message: string) {
  return {
    type: GET_DATASETS_REPORT_FAILED,
    payload: {
      message
    }
  };
}

export function resetDatasetsReport() {
  return {
    type: RESET_DATASETS_REPORT
  };
}
