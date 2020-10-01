import {
  GET_ORGANIZATION_REQUESTED,
  GET_ORGANIZATION_SUCCEEDED,
  GET_ORGANIZATION_FAILED,
  GET_CATALOG_RATING_REQUESTED,
  GET_CATALOG_RATING_SUCCEEDED,
  GET_CATALOG_RATING_FAILED,
  GET_ORGANIZATION_DATASETS_REQUESTED,
  GET_ORGANIZATION_DATASETS_SUCCEEDED,
  GET_ORGANIZATION_DATASETS_FAILED,
  LOAD_MORE_ORGANIZATION_DATASETS_REQUESTED,
  LOAD_MORE_ORGANIZATION_DATASETS_SUCCEEDED,
  LOAD_MORE_ORGANIZATION_DATASETS_FAILED,
  GET_ORGANIZATION_DATASET_REQUESTED,
  GET_ORGANIZATION_DATASET_SUCCEEDED,
  GET_ORGANIZATION_DATASET_FAILED,
  RESET_ORGANIZATION
} from './action-types';

import type { Publisher, Rating, Dataset } from '../../../types';

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

export function getCatalogRatingRequested(id: string) {
  return {
    type: GET_CATALOG_RATING_REQUESTED,
    payload: {
      id
    }
  };
}

export function getCatalogRatingSucceeded(datasets: Dataset[], rating: Rating) {
  return {
    type: GET_CATALOG_RATING_SUCCEEDED,
    payload: {
      datasets,
      rating
    }
  };
}

export function getCatalogRatingFailed(message: string) {
  return {
    type: GET_CATALOG_RATING_FAILED,
    payload: {
      message
    }
  };
}

export function getOrganizationDatasetsRequested(id: string) {
  return {
    type: GET_ORGANIZATION_DATASETS_REQUESTED,
    payload: {
      id
    }
  };
}

export function getOrganizationDatasetsSucceeded(
  datasets: Dataset[],
  rating: Rating,
  hasMoreDatasets: boolean,
  datasetsPageSize: number,
  datasetsCount: number
) {
  return {
    type: GET_ORGANIZATION_DATASETS_SUCCEEDED,
    payload: {
      datasets,
      rating,
      hasMoreDatasets,
      datasetsPageSize,
      datasetsCount
    }
  };
}

export function getOrganizationDatasetsFailed(message: string) {
  return {
    type: GET_ORGANIZATION_DATASETS_FAILED,
    payload: {
      message
    }
  };
}

export function loadMoreOrganizationDatasetsRequested(
  id: string,
  page: number
) {
  return {
    type: LOAD_MORE_ORGANIZATION_DATASETS_REQUESTED,
    payload: {
      id,
      page
    }
  };
}

export function loadMoreOrganizationDatasetsSucceeded(
  datasets: Dataset[],
  rating: Rating,
  page: number,
  hasMoreDatasets: boolean
) {
  return {
    type: LOAD_MORE_ORGANIZATION_DATASETS_SUCCEEDED,
    payload: {
      datasets,
      rating,
      page,
      hasMoreDatasets
    }
  };
}

export function loadMoreOrganizationDatasetsFailed(message: string) {
  return {
    type: LOAD_MORE_ORGANIZATION_DATASETS_FAILED,
    payload: {
      message
    }
  };
}

export function getOrganizationDatasetRequested(
  organizationId: string,
  datasetId: string
) {
  return {
    type: GET_ORGANIZATION_DATASET_REQUESTED,
    payload: {
      organizationId,
      datasetId
    }
  };
}

export function getOrganizationDatasetSucceeded(dataset: Dataset) {
  return {
    type: GET_ORGANIZATION_DATASET_SUCCEEDED,
    payload: {
      dataset
    }
  };
}

export function getOrganizationDatasetFailed(message: string) {
  return {
    type: GET_ORGANIZATION_DATASET_FAILED,
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
