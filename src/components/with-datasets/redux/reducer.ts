import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_DATASETS_REQUESTED,
  GET_DATASETS_SUCCEEDED,
  GET_DATASETS_FAILED
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  datasets: [],
  isLoadingDatasets: false
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_DATASETS_REQUESTED:
      return state.set('datasets', fromJS([])).set('isLoadingDatasets', true);
    case GET_DATASETS_SUCCEEDED:
      return state
        .set('datasets', fromJS(action.payload.datasets))
        .set('isLoadingDatasets', false);
    case GET_DATASETS_FAILED:
      return state.set('isLoadingDatasets', false);
    default:
      return state;
  }
}
