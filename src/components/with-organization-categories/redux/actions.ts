import {
  GET_ORGANIZATION_CATEGORIES_REQUESTED,
  GET_ORGANIZATION_CATEGORIES_SUCCEEDED,
  GET_ORGANIZATION_CATEGORIES_FAILED
} from './action-types';

export function getOrganizationCategoriesRequested(
  type: 'state' | 'municipality',
  includeEmpty: boolean
) {
  return {
    type: GET_ORGANIZATION_CATEGORIES_REQUESTED,
    payload: {
      type,
      includeEmpty
    }
  };
}

export function getOrganizationCategoriesSucceeded(categories: any) {
  return {
    type: GET_ORGANIZATION_CATEGORIES_SUCCEEDED,
    payload: {
      categories
    }
  };
}

export function getOrganizationCategoriesFailed(message: string) {
  return {
    type: GET_ORGANIZATION_CATEGORIES_FAILED,
    payload: {
      message
    }
  };
}
