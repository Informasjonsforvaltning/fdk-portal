import {
  GET_RESOURCE_RELATIONS_REQUESTED,
  GET_RESOURCE_RELATIONS_SUCCEEDED,
  GET_RESOURCE_RELATIONS_FAILED,
  RESET_RESOURCE_RELATIONS
} from './action-types';

import type { SearchObject } from '../../../types';

interface GetResoruceRelationsParams {
  size?: number;
  relations: string;
}

const defaultSize: number = 100;

export function getResourceRelationsRequested(
  params: GetResoruceRelationsParams
) {
  return {
    type: GET_RESOURCE_RELATIONS_REQUESTED,
    payload: {
      params: {
        ...params,
        size: params.size ?? defaultSize
      }
    }
  };
}

export function getResourceRelationsSucceeded(relations: SearchObject[]) {
  return {
    type: GET_RESOURCE_RELATIONS_SUCCEEDED,
    payload: {
      relations
    }
  };
}

export function getResourceRelationsFailed(message: string) {
  return {
    type: GET_RESOURCE_RELATIONS_FAILED,
    payload: {
      message
    }
  };
}

export function resetResourceRelations() {
  return {
    type: RESET_RESOURCE_RELATIONS
  };
}
