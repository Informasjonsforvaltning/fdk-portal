import { fromJS } from 'immutable';

import * as actions from './actions';
import { GET_CONCEPTS_REQUESTED, GET_CONCEPTS_SUCCEEDED } from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  concepts: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_CONCEPTS_REQUESTED:
      return state.set('concepts', fromJS([]));
    case GET_CONCEPTS_SUCCEEDED:
      return state.set('concepts', fromJS(action.payload.concepts));
    default:
      return state;
  }
}
