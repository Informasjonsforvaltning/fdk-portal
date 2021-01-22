import {
  GET_PUBLIC_SERVICES_REQUESTED,
  GET_PUBLIC_SERVICES_SUCCEEDED,
  GET_PUBLIC_SERVICES_FAILED,
  RESET_PUBLIC_SERVICES,
  GET_PUBLIC_SERVICES_REQUIRED_BY_REQUESTED,
  GET_PUBLIC_SERVICES_REQUIRED_BY_SUCCEEDED,
  GET_PUBLIC_SERVICES_REQUIRED_BY_FAILED,
  RESET_PUBLIC_SERVICES_REQUIRED_BY
} from './action-types';

import type { PublicService } from '../../../types';

interface GetPublicServicesParams {
  q?: string;
  size?: number;
  orgPath?: string;
  isGroupedBy?: string;
  keywords?: string;
  publicServiceIdentifiers?: string[];
  requiredByServiceUri?: string;
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

export function getPublicServicesRequiredByRequested(
  params: GetPublicServicesParams
) {
  return {
    type: GET_PUBLIC_SERVICES_REQUIRED_BY_REQUESTED,
    payload: {
      params
    }
  };
}

export function getPublicServicesRequiredBySucceeded(
  publicServiceData: PublicService[]
) {
  return {
    type: GET_PUBLIC_SERVICES_REQUIRED_BY_SUCCEEDED,
    payload: {
      publicServiceData
    }
  };
}

export function getPublicServicesRequiredByFailed(message: string) {
  return {
    type: GET_PUBLIC_SERVICES_REQUIRED_BY_FAILED,
    payload: {
      message
    }
  };
}

export function resetPublicServicesRequiredBy() {
  return {
    type: RESET_PUBLIC_SERVICES_REQUIRED_BY
  };
}
