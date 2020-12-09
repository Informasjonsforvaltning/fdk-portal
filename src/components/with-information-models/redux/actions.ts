import {
  GET_INFORMATION_MODELS_REQUESTED,
  GET_INFORMATION_MODELS_SUCCEEDED,
  GET_INFORMATION_MODELS_FAILED
} from './action-types';

import type { InformationModel } from '../../../types';

interface GetInformationModelsParams {
  conceptIdentifiers?: string[];
  informationModelIdentifiers?: string[];
  size?: number;
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
  informationModels: InformationModel[]
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
