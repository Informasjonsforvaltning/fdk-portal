import {
  GET_DATASETS_REQUESTED,
  GET_DATASETS_SUCCEEDED,
  GET_DATASETS_FAILED,
  RESET_DATASETS
} from './action-types';

import type { Dataset } from '../../../types';

interface GetDatasetsParams {
  uris?: string;
  size?: number;
  orgPath?: string;
  subject?: string;
}

export function getDatasetsRequested(params?: GetDatasetsParams) {
  return {
    type: GET_DATASETS_REQUESTED,
    payload: {
      params
    }
  };
}

export function getDatasetsSucceeded(datasets: Dataset[]) {
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
