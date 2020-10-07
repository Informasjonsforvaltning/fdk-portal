import {
  GET_ORGANIZATIONS_REQUESTED,
  GET_ORGANIZATIONS_SUCCEEDED,
  GET_ORGANIZATIONS_FAILED
} from './action-types';

export function getOrganizationsRequested(filter?: string) {
  return {
    type: GET_ORGANIZATIONS_REQUESTED,
    payload: {
      filter
    }
  };
}

export function getOrganizationsSucceeded(organizations: any) {
  return {
    type: GET_ORGANIZATIONS_SUCCEEDED,
    payload: {
      organizations
    }
  };
}

export function getOrganizationsFailed(message: string) {
  return {
    type: GET_ORGANIZATIONS_FAILED,
    payload: {
      message
    }
  };
}
