import {
  GET_DATASET_REQUESTED,
  GET_DATASET_SUCCEEDED,
  GET_DATASET_FAILED,
  RESET_DATASET
} from './action-types';

import { Dataset } from '../../../types';

export function getDatasetRequested(id: string) {
  return {
    type: GET_DATASET_REQUESTED,
    payload: {
      id
    }
  };
}

export function getDatasetSucceeded(dataset: Dataset) {
  return {
    type: GET_DATASET_SUCCEEDED,
    payload: {
      dataset
    }
  };
}

export function getDatasetFailed(message: string) {
  return {
    type: GET_DATASET_FAILED,
    payload: {
      message
    }
  };
}

export function resetDataset() {
  return {
    type: RESET_DATASET
  };
}
