import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_DATASETS_REPORT_REQUESTED,
  GET_DATASETS_REPORT_SUCCEEDED,
  GET_DATASETS_REPORT_FAILED,
  RESET_DATASETS_REPORT
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  datasetsReport: null
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_DATASETS_REPORT_REQUESTED:
      return state.set('datasetsReport', null);
    case GET_DATASETS_REPORT_SUCCEEDED:
      return state.set('datasetsReport', fromJS(action.payload.report));
    case GET_DATASETS_REPORT_FAILED:
      return state;
    case RESET_DATASETS_REPORT:
      return state.set('datasetsReport', null);
    default:
      return state;
  }
}
