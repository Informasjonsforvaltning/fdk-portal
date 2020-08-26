import {
  GET_DATASETSSTATISTICS_REQUESTED,
  GET_DATASETSSTATISTICS_SUCCEEDED,
  GET_DATASETSSTATISTICS_FAILED,
  RESET_DATASETSSTATISTICS
} from './action-types';

import type { DatasetsReport } from '../../../types';

export function getDatasetsStatisticsRequested(id: any) {
  return {
    type: GET_DATASETSSTATISTICS_REQUESTED,
    payload: {
      id
    }
  };
}

export function getDatasetsStatisticsSucceeded(datasetsReport: DatasetsReport) {
  return {
    type: GET_DATASETSSTATISTICS_SUCCEEDED,
    payload: {
      datasetsReport
    }
  };
}

export function getDatasetsStatisticsFailed(message: string) {
  return {
    type: GET_DATASETSSTATISTICS_FAILED,
    payload: {
      message
    }
  };
}

export function resetStatistics() {
  return {
    type: RESET_DATASETSSTATISTICS
  };
}
