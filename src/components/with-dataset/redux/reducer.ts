import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_DATASET_FAILED,
  GET_DATASET_REQUESTED,
  GET_DATASET_SUCCEEDED,
  RESET_DATASET
} from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  dataset: null,
  isLoadingDataset: false
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_DATASET_REQUESTED:
      return state.set('dataset', null).set('isLoadingDataset', true);
    case GET_DATASET_SUCCEEDED:
      return state
        .set('dataset', fromJS(action.payload.dataset))
        .set('isLoadingDataset', false);
    case GET_DATASET_FAILED:
      return state.set('isLoadingDataset', false);
    case RESET_DATASET:
      return state.set('isLoadingDataset', false);
    default:
      return state;
  }
}
