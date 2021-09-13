import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_DATASETS_REQUESTED,
  GET_DATASETS_SUCCEEDED,
  GET_DATASETS_FAILED,
  RESET_DATASETS,
  GET_DATASETS_RELATIONS_REQUESTED,
  GET_DATASETS_RELATIONS_SUCCEEDED,
  GET_DATASETS_RELATIONS_FAILED,
  RESET_DATASETS_RELATIONS
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  datasets: [],
  datasetsRelations: [],
  isLoadingDatasets: false
});

export default function reducer(
  state: any = initialState,
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
    case RESET_DATASETS:
      return state.set('datasets', fromJS([]));
    case GET_DATASETS_RELATIONS_REQUESTED:
      return state.set('datasetsRelations', fromJS([]));
    case GET_DATASETS_RELATIONS_SUCCEEDED:
      return state.set('datasetsRelations', fromJS(action.payload.datasets));
    case GET_DATASETS_RELATIONS_FAILED:
      return state.set('datasetsRelations', fromJS([]));
    case RESET_DATASETS_RELATIONS:
      return state.set('datasetsRelations', fromJS([]));
    default:
      return state;
  }
}
