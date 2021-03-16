import {
  GET_PUBLIC_SERVICES_REQUESTED,
  GET_PUBLIC_SERVICES_SUCCEEDED,
  GET_PUBLIC_SERVICES_FAILED,
  RESET_PUBLIC_SERVICES,
  GET_PUBLIC_SERVICES_RELATIONS_REQUESTED,
  GET_PUBLIC_SERVICES_RELATIONS_SUCCEEDED,
  GET_PUBLIC_SERVICES_RELATIONS_FAILED,
  RESET_PUBLIC_SERVICES_RELATIONS
} from './action-types';

import type { PublicService } from '../../../types';

interface GetPublicServicesParams {
  q?: string;
  page?: string;
  sortfield?: string;
  size?: number;
  orgPath?: string;
  isGroupedBy?: string;
  keywords?: string;
  publicServiceIdentifiers?: string[];
  requiredByServiceUri?: string;
  relatedByServiceUri?: string;
  isDescribedAt?: string;
  isClassifiedBy?: string;
  requiresOrRelates?: string;
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

export function getPublicServicesRelationsRequested(
  params: GetPublicServicesParams
) {
  return {
    type: GET_PUBLIC_SERVICES_RELATIONS_REQUESTED,
    payload: {
      params
    }
  };
}

export function getPublicServicesRelationsSucceeded(
  publicServiceData: PublicService[]
) {
  return {
    type: GET_PUBLIC_SERVICES_RELATIONS_SUCCEEDED,
    payload: {
      publicServiceData
    }
  };
}

export function getPublicServicesRelationsFailed(message: string) {
  return {
    type: GET_PUBLIC_SERVICES_RELATIONS_FAILED,
    payload: {
      message
    }
  };
}

export function resetPublicServicesRelations() {
  return {
    type: RESET_PUBLIC_SERVICES_RELATIONS
  };
}
