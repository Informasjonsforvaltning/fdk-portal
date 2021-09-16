import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_CONCEPTS_REQUESTED,
  GET_CONCEPTS_SUCCEEDED,
  RESET_CONCEPTS,
  GET_CONCEPTS_RELATIONS_REQUESTED,
  GET_CONCEPTS_RELATIONS_SUCCEEDED,
  RESET_CONCEPTS_RELATIONS
} from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  concepts: [],
  conceptsRelations: []
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_CONCEPTS_REQUESTED:
      return state.set('concepts', fromJS([]));
    case GET_CONCEPTS_SUCCEEDED:
      return state.set('concepts', fromJS(action.payload.concepts));
    case RESET_CONCEPTS:
      return state.set('concepts', fromJS([]));
    case GET_CONCEPTS_RELATIONS_REQUESTED:
      return state.set('conceptsRelations', fromJS([]));
    case GET_CONCEPTS_RELATIONS_SUCCEEDED:
      return state.set('conceptsRelations', fromJS(action.payload.concepts));
    case RESET_CONCEPTS_RELATIONS:
      return state.set('conceptsRelations', fromJS([]));
    default:
      return state;
  }
}
