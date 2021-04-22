import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_ASSESSMENT_REQUESTED,
  GET_ASSESSMENT_SUCCEEDED,
  GET_CATALOG_RATING_REQUESTED,
  GET_CATALOG_RATING_SUCCEEDED
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  assessment: null,
  catalogRating: null
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_ASSESSMENT_REQUESTED:
      return state.set('assessment', null);
    case GET_ASSESSMENT_SUCCEEDED:
      return state.set('assessment', fromJS(action.payload.assessment));
    case GET_CATALOG_RATING_REQUESTED:
      return state.set('catalogRating', null);
    case GET_CATALOG_RATING_SUCCEEDED:
      return state.set('catalogRating', fromJS(action.payload));
    default:
      return state;
  }
}
