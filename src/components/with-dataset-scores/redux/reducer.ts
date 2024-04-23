import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_DATASET_SCORES_REQUESTED,
  GET_DATASET_SCORES_SUCCEEDED,
  RESET_DATASET_SCORES
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  score: null
});

export default function reducer(state: any, action: Actions<typeof actions>) {
  if (!state) {
    state = initialState;
  }

  switch (action.type) {
    case GET_DATASET_SCORES_REQUESTED:
      return state.set('datasetScores', null);
    case GET_DATASET_SCORES_SUCCEEDED:
      return state.set('datasetScores', fromJS(action.payload.scores));
    case RESET_DATASET_SCORES:
      return state.set('datasetScores', null);
    default:
      return state;
  }
}
