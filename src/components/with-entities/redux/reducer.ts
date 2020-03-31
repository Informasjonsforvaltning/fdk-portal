import { fromJS } from 'immutable';

import * as actions from './actions';
import { GET_ENTITIES_REQUESTED, GET_ENTITIES_SUCCEEDED } from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  entities: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_ENTITIES_REQUESTED:
      return state.set('entities', fromJS([]));
    case GET_ENTITIES_SUCCEEDED:
      return state.set('entities', fromJS(action.payload.entities));
    default:
      return state;
  }
}
