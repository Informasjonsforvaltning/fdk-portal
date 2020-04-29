import {
  GET_DATA_SERVICES_REQUESTED,
  GET_DATA_SERVICES_SUCCEEDED,
  GET_DATA_SERVICES_FAILED
} from './action-types';

import { DataService } from '../../../types';

interface GetDataServicesParams {
  dataseturi?: string;
}

export function getDataServicesRequested(params: GetDataServicesParams) {
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
