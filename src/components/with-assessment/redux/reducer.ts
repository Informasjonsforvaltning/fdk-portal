import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_ASSESSMENT_REQUESTED,
  GET_ASSESSMENT_SUCCEEDED
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  assessment: null
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
    default:
      return state;
  }
}
