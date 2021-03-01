import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_DATA_SERVICES_REQUESTED,
  GET_DATA_SERVICES_SUCCEEDED,
  RESET_DATA_SERVICES,
  GET_DATA_SERVICES_RELATIONS_REQUESTED,
  GET_DATA_SERVICES_RELATIONS_SUCCEEDED,
  RESET_DATA_SERVICES_RELATIONS
} from './action-types';

import { Actions } from '../../../types';

const initialState = fromJS({
  dataServices: [],
  dataServicesRelations: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_DATA_SERVICES_REQUESTED:
      return state.set('dataServices', fromJS([]));
    case GET_DATA_SERVICES_SUCCEEDED:
      return state.set('dataServices', fromJS(action.payload.dataServices));
    case RESET_DATA_SERVICES:
      return state.set('dataServices', fromJS([]));
    case GET_DATA_SERVICES_RELATIONS_REQUESTED:
      return state.set('dataServicesRelations', fromJS([]));
    case GET_DATA_SERVICES_RELATIONS_SUCCEEDED:
      return state.set(
        'dataServicesRelations',
        fromJS(action.payload.dataServices)
      );
    case RESET_DATA_SERVICES_RELATIONS:
      return state.set('dataServicesRelations', fromJS([]));
    default:
      return state;
  }
}
