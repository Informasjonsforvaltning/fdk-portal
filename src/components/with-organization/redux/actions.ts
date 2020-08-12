import {
  GET_ORGANIZATION_REQUESTED,
  GET_ORGANIZATION_SUCCEEDED,
  GET_ORGANIZATION_FAILED,
  RESET_ORGANIZATION
} from './action-types';

import type { Publisher } from '../../../types';

export function getOrganizationRequested(id: string) {
  return {
    type: GET_ORGANIZATION_REQUESTED,
    payload: {
      id
    }
  };
}

export function getOrganizationSucceeded(organization: Publisher) {
  return {
    type: GET_ORGANIZATION_SUCCEEDED,
    payload: {
      organization
    }
  };
}

export function getOrganizationFailed(message: string) {
  return {
    type: GET_ORGANIZATION_FAILED,
    payload: {
      message
    }
  };
}

export function resetOrganization() {
  return {
    type: RESET_ORGANIZATION
  };
}
