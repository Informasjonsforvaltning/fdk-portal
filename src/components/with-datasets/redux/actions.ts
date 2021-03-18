import {
  GET_DATASETS_REQUESTED,
  GET_DATASETS_SUCCEEDED,
  GET_DATASETS_FAILED,
  RESET_DATASETS,
  GET_DATASETS_RELATIONS_REQUESTED,
  GET_DATASETS_RELATIONS_SUCCEEDED,
  GET_DATASETS_RELATIONS_FAILED,
  RESET_DATASETS_RELATIONS
} from './action-types';

import type { Dataset } from '../../../types';

interface GetDatasetsParams {
  uris?: string[];
  size?: number;
  orgPath?: string;
  subject?: string;
  info_model?: string;
  referencesSource?: string;
  accessService?: string;
  conformsTo?: string;
  relatedToInfoModel?: string;
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

export function getDatasetsRelationsRequested(params?: GetDatasetsParams) {
  return {
    type: GET_DATASETS_RELATIONS_REQUESTED,
    payload: {
      params
    }
  };
}

export function getDatasetsRelationsSucceeded(datasets: Dataset[]) {
  return {
    type: GET_DATASETS_RELATIONS_SUCCEEDED,
    payload: {
      datasets
    }
  };
}

export function getDatasetsRelationsFailed(message: string) {
  return {
    type: GET_DATASETS_RELATIONS_FAILED,
    payload: {
      message
    }
  };
}

export function resetDatasetsRelations() {
  return {
    type: RESET_DATASETS_RELATIONS
  };
}
