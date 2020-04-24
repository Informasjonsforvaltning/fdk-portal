import {
  GET_DATASETS_REQUESTED,
  GET_DATASETS_SUCCEEDED,
  GET_DATASETS_FAILED
} from './action-types';

import { Dataset } from '../../../types';

export function getDatasetsRequested(params: object, datasetId: string) {
  return {
    type: GET_DATASETS_REQUESTED,
    payload: {
      params,
      datasetId
    }
  };
}

export function getDatasetsSucceeded(datasets: Dataset[], datasetId: string) {
  return {
    type: GET_DATASETS_SUCCEEDED,
    payload: {
      datasets,
      datasetId
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
