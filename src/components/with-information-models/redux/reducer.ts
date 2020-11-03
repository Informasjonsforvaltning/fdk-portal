import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_INFORMATION_MODELS_REQUESTED,
  GET_INFORMATION_MODELS_SUCCEEDED,
  GET_INFORMATION_MODELS_FAILED
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  informationModels: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_INFORMATION_MODELS_REQUESTED:
      return state.set('informationModels', fromJS([]));
    case GET_INFORMATION_MODELS_SUCCEEDED:
      return state.set(
        'informationModels',
        fromJS(action.payload.informationModels)
      );
    case GET_INFORMATION_MODELS_FAILED:
      return state;
    default:
      return state;
  }
}
