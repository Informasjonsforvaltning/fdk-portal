import { fromJS } from 'immutable';

import * as actions from './actions';
import { GET_DATASET_REQUESTED, GET_DATASET_SUCCEEDED } from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  dataset: null
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_DATASET_REQUESTED:
      return state.set('dataset', null);
    case GET_DATASET_SUCCEEDED:
      return state.set('dataset', fromJS(action.payload.dataset));
    default:
      return state;
  }
}
