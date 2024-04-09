import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_INFORMATION_MODELS_REQUESTED,
  GET_INFORMATION_MODELS_SUCCEEDED,
  RESET_INFORMATION_MODELS
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  informationModels: []
});

export default function reducer(
  state: any = initialState,
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
    case RESET_INFORMATION_MODELS:
      return state.set('informationModels', fromJS([]));
    default:
      return state;
  }
}
