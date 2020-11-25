import {
  GET_PUBLIC_SERVICES_REQUESTED,
  GET_PUBLIC_SERVICES_SUCCEEDED,
  GET_PUBLIC_SERVICES_FAILED,
  RESET_PUBLIC_SERVICES
} from './action-types';

interface GetPublicServicesParams {
  q?: string;
  size?: number;
  orgPath?: string;
  isGroupedBy?: string;
}

export function getPublicServicesRequested(params: GetPublicServicesParams) {
  return {
    type: GET_PUBLIC_SERVICES_REQUESTED,
    payload: {
      params
    }
  };
}

export function getPublicServicesSucceeded(publicServiceData: any) {
  return {
    type: GET_PUBLIC_SERVICES_SUCCEEDED,
    payload: {
      publicServiceData
    }
  };
}

export function getPublicServicesFailed(message: string) {
  return {
    type: GET_PUBLIC_SERVICES_FAILED,
    payload: {
      message
    }
  };
}

export function resetPublicServices() {
  return {
    type: RESET_PUBLIC_SERVICES
  };
}
