import { fromJS } from 'immutable';

import * as actions from './actions';
import { GET_DATASETS_REQUESTED, GET_DATASETS_SUCCEEDED } from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  datasets: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_DATASETS_REQUESTED:
      return state.set('datasets', fromJS([]));
    case GET_DATASETS_SUCCEEDED:
      return state.set('datasets', fromJS(action.payload.datasets));
    default:
      return state;
  }
}
