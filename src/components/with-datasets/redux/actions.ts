import {
  GET_DATASETS_REQUESTED,
  GET_DATASETS_SUCCEEDED,
  GET_DATASETS_FAILED,
  RESET_DATASETS
} from './action-types';

import type { SearchObject } from '../../../types';

interface GetDatasetsParams {
  uri?: string[];
  size?: number;
  orgPath?: string;
}

export function getDatasetsRequested(params?: GetDatasetsParams) {
  return {
    type: GET_DATASETS_REQUESTED,
    payload: {
      params
    }
  };
}

export function getDatasetsSucceeded(datasets: SearchObject[]) {
  return {
    type: GET_DATASETS_SUCCEEDED,
    payload: {
      datasets
    }
  };
}

export function getDatasetsFailed(message: string) {
  return {
    type: GET_DATASETS_FAILED,
    payload: {
      message
    }
  };
}

export function resetDatasets() {
  return {
    type: RESET_DATASETS
  };
}
