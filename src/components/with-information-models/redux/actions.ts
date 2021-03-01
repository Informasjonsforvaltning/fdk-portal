import {
  GET_INFORMATION_MODELS_REQUESTED,
  GET_INFORMATION_MODELS_SUCCEEDED,
  GET_INFORMATION_MODELS_FAILED,
  RESET_INFORMATION_MODELS,
  GET_INFORMATION_MODELS_RELATIONS_REQUESTED,
  GET_INFORMATION_MODELS_RELATIONS_SUCCEEDED,
  GET_INFORMATION_MODELS_RELATIONS_FAILED,
  RESET_INFORMATION_MODELS_RELATIONS
} from './action-types';

import type { InformationModel } from '../../../types';

interface GetInformationModelsParams {
  conceptIdentifiers?: string[];
  informationModelIdentifiers?: string[];
  size?: number;
  relations?: string;
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

export function resetInformationModels() {
  return {
    type: RESET_INFORMATION_MODELS
  };
}

export function getInformationModelsRelationsRequested(
  params?: GetInformationModelsParams
) {
  return {
    type: GET_INFORMATION_MODELS_RELATIONS_REQUESTED,
    payload: {
      params
    }
  };
}

export function getInformationModelsRelationsSucceeded(
  informationModels: InformationModel[]
) {
  return {
    type: GET_INFORMATION_MODELS_RELATIONS_SUCCEEDED,
    payload: {
      informationModels
    }
  };
}

export function getInformationModelsRelationsFailed(message: string) {
  return {
    type: GET_INFORMATION_MODELS_RELATIONS_FAILED,
    payload: {
      message
    }
  };
}

export function resetInformationModelsRelations() {
  return {
    type: RESET_INFORMATION_MODELS_RELATIONS
  };
}
