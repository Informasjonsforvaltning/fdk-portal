import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_DATASET_PREVIEW_REQUESTED,
  GET_DATASET_PREVIEW_SUCCEEDED,
  GET_DATASET_PREVIEW_FAILED,
  RESET_DATASET_PREVIEW
} from './actions-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  distibutionPreview: null,
  isLoadingDatasetPreview: false
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_DATASET_PREVIEW_REQUESTED:
      return state.set('isLoadingDatasetPreview', true);
    case GET_DATASET_PREVIEW_SUCCEEDED:
      return state
        .set('datasetPreview', fromJS(action.payload.datasetPreview))
        .set('isLoadingDatasetPreview', false);
    case GET_DATASET_PREVIEW_FAILED:
      return state.set('isLoadingDatasetPreview', false);
    case RESET_DATASET_PREVIEW:
      return state.set('datasetPreview', null);
    default:
      return state;
  }
}
