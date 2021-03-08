import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_CONCEPT_REQUESTED,
  GET_CONCEPT_SUCCEEDED,
  GET_CONCEPT_FAILED
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  concept: null,
  isLoadingConcept: false
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_CONCEPT_REQUESTED:
      return state.set('concept', null).set('isLoadingConcept', true);
    case GET_CONCEPT_SUCCEEDED:
      return state
        .set('concept', fromJS(action.payload.concept))
        .set('isLoadingConcept', false);
    case GET_CONCEPT_FAILED:
      return state.set('isLoadingConcept', false);
    default:
      return state;
  }
}
