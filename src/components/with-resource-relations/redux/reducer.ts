import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_RESOURCE_RELATIONS_REQUESTED,
  GET_RESOURCE_RELATIONS_SUCCEEDED
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  relations: []
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_RESOURCE_RELATIONS_REQUESTED:
      return state.set('relations', fromJS([]));
    case GET_RESOURCE_RELATIONS_SUCCEEDED:
      return state.set('relations', fromJS(action.payload.relations));
    default:
      return state;
  }
}
