import {
  GET_INFORMATION_MODELS_REQUESTED,
  GET_INFORMATION_MODELS_SUCCEEDED,
  GET_INFORMATION_MODELS_FAILED,
  RESET_INFORMATION_MODELS
} from './action-types';

import type { SearchObject } from '../../../types';

interface GetInformationModelsParams {
  size?: number;
  relations?: string;
  uri?: string[];
}

export function getInformationModelsRequested(
  params?: GetInformationModelsParams
) {
  return {
    type: GET_INFORMATION_MODELS_REQUESTED,
    payload: {
      params
    }
  };
}

export function getInformationModelsSucceeded(
  informationModels: SearchObject[]
) {
  return {
    type: GET_INFORMATION_MODELS_SUCCEEDED,
    payload: {
      informationModels
    }
  };
}

export function getInformationModelsFailed(message: string) {
  return {
    type: GET_INFORMATION_MODELS_FAILED,
    payload: {
      message
    }
  };
}

export function resetInformationModels() {
  return {
    type: RESET_INFORMATION_MODELS
  };
}
