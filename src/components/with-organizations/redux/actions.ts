import {
  GET_ORGANIZATIONS_REQUESTED,
  GET_ORGANIZATIONS_SUCCEEDED,
  GET_ORGANIZATIONS_FAILED,
  SORT_ORGANIZATIONS
} from './action-types';

import { SortOrder } from '../../../types/enums';

export function getOrganizationsRequested(
  filter?: string,
  includeEmpty?: string
) {
  return {
    type: GET_ORGANIZATIONS_REQUESTED,
    payload: {
      filter,
      includeEmpty
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

export function sortOrganizations(selector: string[], order: SortOrder) {
  return {
    type: SORT_ORGANIZATIONS,
    payload: {
      selector,
      order
    }
  };
}
