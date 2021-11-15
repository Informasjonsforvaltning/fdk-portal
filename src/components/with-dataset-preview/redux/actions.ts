import {
  GET_DATASET_PREVIEW_REQUESTED,
  GET_DATASET_PREVIEW_SUCCEEDED,
  GET_DATASET_PREVIEW_FAILED,
  RESET_DATASET_PREVIEW
} from './actions-types';

import type { DatasetPreview } from '../../../types';

export function getDatasetPreviewRequested(url: string, rows: number) {
  return {
    type: GET_DATASET_PREVIEW_REQUESTED,
    payload: { url, rows }
  };
}

export function getDatasetPreviewSucceeded(datasetPreview: DatasetPreview) {
  return {
    type: GET_DATASET_PREVIEW_SUCCEEDED,
    payload: {
      datasetPreview
    }
  };
}

export function getDatasetPreviewFailed(errors: Error | Error[]) {
  return {
    type: GET_DATASET_PREVIEW_FAILED,
    payload: Array.isArray(errors) ? errors : [errors],
    error: true
  };
}

export function resetDatasetPreview() {
  return {
    type: RESET_DATASET_PREVIEW
  };
}
