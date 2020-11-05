import {
  GET_DATA_SERVICE_REQUESTED,
  GET_DATA_SERVICE_SUCCEEDED,
  GET_DATA_SERVICE_FAILED
} from './action-types';

import type { DataService } from '../../../types';

export function getDataServiceRequested(id: string) {
  return {
    type: GET_DATA_SERVICE_REQUESTED,
    payload: {
      id
    }
  };
}

export function getDataServiceSucceeded(dataService: DataService) {
  return {
    type: GET_DATA_SERVICE_SUCCEEDED,
    payload: {
      dataService
    }
  };
}

export function getDataServiceFailed(message: string) {
  return {
    type: GET_DATA_SERVICE_FAILED,
    payload: {
      message
    }
  };
}
