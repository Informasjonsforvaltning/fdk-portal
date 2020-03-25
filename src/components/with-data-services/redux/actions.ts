import {
  GET_DATA_SERVICES_REQUESTED,
  GET_DATA_SERVICES_SUCCEEDED,
  GET_DATA_SERVICES_FAILED
} from './action-types';

import { DataService } from '../../../types';

export function getDataServicesRequested(params: object) {
  return {
    type: GET_DATA_SERVICES_REQUESTED,
    payload: {
      params
    }
  };
}

export function getDataServicesSucceeded(dataServices: DataService[]) {
  return {
    type: GET_DATA_SERVICES_SUCCEEDED,
    payload: {
      dataServices
    }
  };
}

export function getDataServicesFailed(message: string) {
  return {
    type: GET_DATA_SERVICES_FAILED,
    payload: {
      message
    }
  };
}
