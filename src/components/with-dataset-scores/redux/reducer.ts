import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_DATASET_SCORES_REQUESTED,
  GET_DATASET_SCORES_SUCCEEDED
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  score: null
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_DATASET_SCORES_REQUESTED:
      return state.set('datasetScores', null);
    case GET_DATASET_SCORES_SUCCEEDED:
      return state.set('datasetScores', fromJS(action.payload.scores));

    default:
      return state;
  }
}
