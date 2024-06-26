import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_CONCEPTS_REQUESTED,
  GET_CONCEPTS_SUCCEEDED,
  RESET_CONCEPTS
} from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  concepts: []
});

export default function reducer(state: any, action: Actions<typeof actions>) {
  state = state || initialState;
  switch (action.type) {
    case GET_CONCEPTS_REQUESTED:
      return state.set('concepts', fromJS([]));
    case GET_CONCEPTS_SUCCEEDED:
      return state.set('concepts', fromJS(action.payload.concepts));
    case RESET_CONCEPTS:
      return state.set('concepts', fromJS([]));
    default:
      return state;
  }
}
