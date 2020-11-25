import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_PUBLIC_SERVICES_FAILED,
  GET_PUBLIC_SERVICES_REQUESTED,
  GET_PUBLIC_SERVICES_SUCCEEDED,
  RESET_PUBLIC_SERVICES
} from './action-types';

import type { Actions } from '../../../types';
import { PublicService, PublicServiceEvent } from '../../../types';

const initialState = fromJS({
  publicServices: [],
  publicServicesAggregations: null,
  publicServicesPage: null,
  publicServicesEvents: []
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
        )
        .set(
          'publicServicesEvents',
          fromJS(
            action.payload.publicServiceData.hits?.reduce(
              (unique: any, { isGroupedBy }: PublicService) => {
                isGroupedBy?.forEach(
                  (publicServiceEvent: PublicServiceEvent) => {
                    if (
                      !unique.some(
                        ({ uri }: PublicServiceEvent) =>
                          uri === publicServiceEvent.uri
                      )
                    ) {
                      unique.push(publicServiceEvent);
                    }
                  }
                );
                return unique;
              },
              []
            )
          )
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
        .set('publicServices', null)
        .set('publicServicesAggregations', null)
        .set('publicServicesPage', null)
        .set('publicServicesEvents', null);
    default:
      return state;
  }
}
