import {
  GET_ORGANIZATIONS_CATALOG_REQUESTED,
  GET_ORGANIZATIONS_CATALOG_SUCCEEDED,
  GET_ORGANIZATIONS_CATALOG_FAILED,
  RESET_ORGANIZATIONS_CATALOG
} from './action-types';

export function getOrganizationsCatalogRequested() {
  return {
    type: GET_ORGANIZATIONS_CATALOG_REQUESTED
  };
}

export function getOrganizationsCatalogSucceeded(organizations: any) {
  return {
    type: GET_ORGANIZATIONS_CATALOG_SUCCEEDED,
    payload: {
      organizations
    }
  };
}

export function getOrganizationsCatalogFailed(message: string) {
  return {
    type: GET_ORGANIZATIONS_CATALOG_FAILED,
    payload: {
      message
    }
  };
}

export function resetOrganizationsCatalog() {
  return {
    type: RESET_ORGANIZATIONS_CATALOG
  };
}
