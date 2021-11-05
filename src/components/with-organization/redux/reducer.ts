import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_ORGANIZATION_REQUESTED,
  GET_ORGANIZATION_SUCCEEDED,
  GET_ORGANIZATION_FAILED,
  GET_ENHETSREGISTERET_ORGANIZATION_REQUESTED,
  GET_ENHETSREGISTERET_ORGANIZATION_SUCCEEDED,
  GET_ENHETSREGISTERET_ORGANIZATION_FAILED,
  GET_ORGANIZATION_RATING_REQUESTED,
  GET_ORGANIZATION_RATING_SUCCEEDED,
  GET_ORGANIZATION_RATING_FAILED,
  RESET_ORGANIZATION
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  organization: null,
  isLoadingOrganization: false,
  isLoadingRating: false,
  enhetsregisteretOrganization: null,
  datasets: [],
  dataset: null,
  datasetsPage: 0,
  datasetsPageSize: 0,
  datasetsCount: 0,
  hasMoreDatasets: false,
  rating: null
});

export default function reducer(
  state: any = initialState,
  action: Actions<typeof actions>
) {
  switch (action.type) {
    case GET_ORGANIZATION_REQUESTED:
      return state.set('organization', null).set('isLoadingOrganization', true);
    case GET_ORGANIZATION_SUCCEEDED:
      return state
        .set('organization', fromJS(action.payload.organization))
        .set('isLoadingOrganization', false);
    case GET_ORGANIZATION_FAILED:
      return state.set('isLoadingOrganization', false);
    case GET_ENHETSREGISTERET_ORGANIZATION_REQUESTED:
      return state.set('enhetsregisteretOrganization', null);
    case GET_ENHETSREGISTERET_ORGANIZATION_SUCCEEDED:
      return state.set(
        'enhetsregisteretOrganization',
        fromJS(action.payload.organization)
      );
    case GET_ENHETSREGISTERET_ORGANIZATION_FAILED:
      return state;
    case GET_ORGANIZATION_RATING_REQUESTED:
      return state
        .set('datasets', fromJS([]))
        .set('rating', null)
        .set('isLoadingRating', true);
    case GET_ORGANIZATION_RATING_SUCCEEDED:
      return state
        .set('rating', fromJS(action.payload.rating))
        .set('isLoadingRating', false);
    case GET_ORGANIZATION_RATING_FAILED:
      return state.set('isLoadingRating', false);
    case RESET_ORGANIZATION:
      return state.set('organization', null);
    default:
      return state;
  }
}
