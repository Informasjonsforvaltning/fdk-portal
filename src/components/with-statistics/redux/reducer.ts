import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_DATASETSSTATISTICS_REQUESTED,
  GET_DATASETSSTATISTICS_SUCCEEDED,
  GET_DATASETSSTATISTICS_FAILED,
  RESET_DATASETSSTATISTICS
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  statistics: {}
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_DATASETSSTATISTICS_REQUESTED:
      return state.setIn(['statistics', 'datasetsStatistics'], null);
    case GET_DATASETSSTATISTICS_SUCCEEDED:
      return state.setIn(
        ['statistics', 'datasetsStatistics'],
        fromJS(action.payload.datasetsReport)
      );
    case GET_DATASETSSTATISTICS_FAILED:
      return state;
    case RESET_DATASETSSTATISTICS:
      return state.setIn(['statistics', 'datasetsStatistics'], null);
    default:
      return state;
  }
}
