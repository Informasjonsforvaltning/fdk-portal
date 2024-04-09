import {
  GET_DATA_SERVICES_REQUESTED,
  GET_DATA_SERVICES_SUCCEEDED,
  GET_DATA_SERVICES_FAILED,
  RESET_DATA_SERVICES
} from './action-types';

import { SearchObject } from '../../../types';

interface GetDataServicesParams {
  dataseturi?: string;
  size?: number;
  endpointDescription?: string[];
  servesDataset?: string;
  uris?: string[];
}

export function getDataServicesRequested(params: GetDataServicesParams) {
  return {
    type: GET_DATA_SERVICES_REQUESTED,
    payload: {
      params
    }
  };
}

export function getDataServicesSucceeded(dataServices: SearchObject[]) {
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

export function resetDataServices() {
  return {
    type: RESET_DATA_SERVICES
  };
}
