import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_DATASETS_REQUESTED,
  GET_DATASETS_SUCCEEDED,
  GET_DATASETS_FAILED,
  RESET_DATASETS
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  datasets: [],
  datasetsRelations: [],
  isLoadingDatasets: false
});

export default function reducer(state: any, action: Actions<typeof actions>) {
  state = state || initialState;
  switch (action.type) {
    case GET_DATASETS_REQUESTED:
      return state.set('datasets', fromJS([])).set('isLoadingDatasets', true);
    case GET_DATASETS_SUCCEEDED:
      return state
        .set('datasets', fromJS(action.payload.datasets))
        .set('isLoadingDatasets', false);
    case GET_DATASETS_FAILED:
      return state.set('isLoadingDatasets', false);
    case RESET_DATASETS:
      return state.set('datasets', fromJS([]));
    default:
      return state;
  }
}
