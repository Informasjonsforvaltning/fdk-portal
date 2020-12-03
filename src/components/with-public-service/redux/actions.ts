import {
  GET_PUBLIC_SERVICE_REQUESTED,
  GET_PUBLIC_SERVICE_SUCCEEDED,
  GET_PUBLIC_SERVICE_FAILED,
  RESET_PUBLIC_SERVICE
} from './action-types';

import type { PublicService } from '../../../types';

export function getPublicServiceRequested(id: string) {
  return {
    type: GET_PUBLIC_SERVICE_REQUESTED,
    payload: {
      id
    }
  };
}

export function getPublicServiceSucceeded(publicService: PublicService) {
  return {
    type: GET_PUBLIC_SERVICE_SUCCEEDED,
    payload: {
      publicService
    }
  };
}

export function getPublicServiceFailed(message: string) {
  return {
    type: GET_PUBLIC_SERVICE_FAILED,
    payload: {
      message
    }
  };
}

export function resetPublicService() {
  return {
    type: RESET_PUBLIC_SERVICE
  };
}
