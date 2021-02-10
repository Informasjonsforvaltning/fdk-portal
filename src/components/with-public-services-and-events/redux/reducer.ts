import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_PUBLIC_SERVICES_AND_EVENTS_FAILED,
  GET_PUBLIC_SERVICES_AND_EVENTS_REQUESTED,
  GET_PUBLIC_SERVICES_AND_EVENTS_SUCCEEDED,
  RESET_PUBLIC_SERVICES_AND_EVENTS
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  publicServicesAndEvents: [],
  publicServicesAndEventsAggregations: null,
  publicServicesAndEventsPage: null
});

export default function reducer(
  state = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_PUBLIC_SERVICES_AND_EVENTS_REQUESTED:
      return state;
    case GET_PUBLIC_SERVICES_AND_EVENTS_SUCCEEDED:
      return state
        .set('publicServicesAndEvents', fromJS(action.payload.hits))
        .set(
          'publicServicesAndEventsAggregations',
          fromJS(action.payload.aggregations)
        )
        .set('publicServicesAndEventsPage', fromJS(action.payload.page));
    case GET_PUBLIC_SERVICES_AND_EVENTS_FAILED:
      return state.setIn(
        ['publicServicesAndEventsMeta'],
        fromJS({
          isFetching: false,
          lastFetch: null,
          queryKey: null
        })
      );
    case RESET_PUBLIC_SERVICES_AND_EVENTS:
      return state
        .set('publicServicesAndEvents', fromJS([]))
        .set('publicServicesAndEventsAggregations', null)
        .set('publicServicesAndEventsPage', null);
    default:
      return state;
  }
}
