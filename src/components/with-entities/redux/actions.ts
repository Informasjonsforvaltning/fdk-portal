import {
  GET_ENTITIES_REQUESTED,
  GET_ENTITIES_SUCCEEDED,
  GET_ENTITIES_FAILED
} from './action-types';

export function getEntitiesRequested() {
  return {
    type: GET_ENTITIES_REQUESTED
  };
}

export function getEntitiesSucceeded(entities: any) {
  return {
    type: GET_ENTITIES_SUCCEEDED,
    payload: {
      entities
    }
  };
}

export function getEntitiesFailed(message: string) {
  return {
    type: GET_ENTITIES_FAILED,
    payload: {
      message
    }
  };
}
