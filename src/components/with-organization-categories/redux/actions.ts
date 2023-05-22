import {
  GET_ORGANIZATION_CATEGORIES_REQUESTED,
  GET_ORGANIZATION_CATEGORIES_SUCCEEDED,
  GET_ORGANIZATION_CATEGORIES_FAILED,
  SORT_ORGANIZATION_CATEGORIES
} from './action-types';

import { SortOrder } from '../../../types/enums';

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

export function sortOrganizationCategories(
  selector: string[],
  order: SortOrder
) {
  return {
    type: SORT_ORGANIZATION_CATEGORIES,
    payload: {
      selector,
      order
    }
  };
}
