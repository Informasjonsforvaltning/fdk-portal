import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_PUBLIC_SERVICES_FAILED,
  GET_PUBLIC_SERVICES_REQUESTED,
  GET_PUBLIC_SERVICES_SUCCEEDED,
  RESET_PUBLIC_SERVICES,
  GET_PUBLIC_SERVICES_RELATIONS_REQUESTED,
  GET_PUBLIC_SERVICES_RELATIONS_SUCCEEDED,
  GET_PUBLIC_SERVICES_RELATIONS_FAILED,
  RESET_PUBLIC_SERVICES_RELATIONS
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  publicServices: [],
  publicServicesAggregations: null,
  publicServicesPage: null,
  publicServicesRelations: []
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_PUBLIC_SERVICES_REQUESTED:
      return state;
    case GET_PUBLIC_SERVICES_SUCCEEDED:
      return state
        .set('publicServices', fromJS(action.payload.publicServiceData.hits))
        .set(
          'publicServicesAggregations',
          fromJS(action.payload.publicServiceData.aggregations)
        )
        .set(
          'publicServicesPage',
          fromJS(action.payload.publicServiceData.page)
        );
    case GET_PUBLIC_SERVICES_FAILED:
      return state.setIn(
        ['publicServicesMeta'],
        fromJS({
          isFetching: false,
          lastFetch: null,
          queryKey: null
        })
      );
    case RESET_PUBLIC_SERVICES:
      return state
        .set('publicServices', fromJS([]))
        .set('publicServicesAggregations', null)
        .set('publicServicesPage', null);

    case GET_PUBLIC_SERVICES_RELATIONS_REQUESTED:
      return state.set('publicServicesRelations', fromJS([]));
    case GET_PUBLIC_SERVICES_RELATIONS_SUCCEEDED:
      return state.set(
        'publicServicesRelations',
        fromJS(action.payload.publicServiceData)
      );
    case GET_PUBLIC_SERVICES_RELATIONS_FAILED:
      return state.set('publicServicesRelations', fromJS([]));
    case RESET_PUBLIC_SERVICES_RELATIONS:
      return state.set('publicServicesRelations', fromJS([]));
    default:
      return state;
  }
}
