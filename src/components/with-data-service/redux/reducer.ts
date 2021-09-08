import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_DATA_SERVICE_REQUESTED,
  GET_DATA_SERVICE_SUCCEEDED,
  GET_DATA_SERVICE_FAILED
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  dataService: null,
  isLoadingDataService: false
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_DATA_SERVICE_REQUESTED:
      return state.set('dataService', null).set('isLoadingDataService', true);
    case GET_DATA_SERVICE_SUCCEEDED:
      return state
        .set('dataService', fromJS(action.payload.dataService))
        .set('isLoadingDataService', false);
    case GET_DATA_SERVICE_FAILED:
      return state.set('isLoadingDataService', false);
    default:
      return state;
  }
}
