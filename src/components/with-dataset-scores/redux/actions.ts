import {
  GET_DATASET_SCORES_REQUESTED,
  GET_DATASET_SCORES_SUCCEEDED,
  GET_DATASET_SCORES_FAILED
} from './action-types';

import type { DatasetScores, DatasetScoresRequest } from '../../../types';

export function getDatasetScoresRequested(request: DatasetScoresRequest) {
  return {
    type: GET_DATASET_SCORES_REQUESTED,
    payload: {
      request
    }
  };
}

export function getDatasetScoresSucceeded(scores: DatasetScores) {
  return {
    type: GET_DATASET_SCORES_SUCCEEDED,
    payload: {
      scores
    }
  };
}

export function getDatasetScoresFailed(message: string) {
  return {
    type: GET_DATASET_SCORES_FAILED,
    payload: {
      message
    }
  };
}
