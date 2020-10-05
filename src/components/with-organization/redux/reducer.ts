import { fromJS } from 'immutable';

import * as actions from './actions';
import {
  GET_ORGANIZATION_REQUESTED,
  GET_ORGANIZATION_SUCCEEDED,
  GET_ORGANIZATION_FAILED,
  GET_CATALOG_RATING_REQUESTED,
  GET_CATALOG_RATING_SUCCEEDED,
  GET_CATALOG_RATING_FAILED,
  GET_ORGANIZATION_DATASETS_REQUESTED,
  GET_ORGANIZATION_DATASETS_SUCCEEDED,
  GET_ORGANIZATION_DATASETS_FAILED,
  LOAD_MORE_ORGANIZATION_DATASETS_REQUESTED,
  LOAD_MORE_ORGANIZATION_DATASETS_SUCCEEDED,
  LOAD_MORE_ORGANIZATION_DATASETS_FAILED,
  GET_ORGANIZATION_DATASET_REQUESTED,
  GET_ORGANIZATION_DATASET_SUCCEEDED,
  GET_ORGANIZATION_DATASET_FAILED,
  RESET_ORGANIZATION
} from './action-types';

import type { Actions } from '../../../types';

const initialState = fromJS({
  organization: null,
  isLoadingOrganization: false,
  datasets: [],
  dataset: null,
  datasetsPage: 0,
  datasetsPageSize: 0,
  datasetsCount: 0,
  hasMoreDatasets: false,
  rating: null
});

export default function reducer(
  state = initialState,
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
    case GET_CATALOG_RATING_REQUESTED:
      return state.set('datasets', fromJS([])).set('rating', null);
    case GET_CATALOG_RATING_SUCCEEDED:
      return state
        .set('datasets', fromJS(action.payload.datasets))
        .set('rating', fromJS(action.payload.rating));
    case GET_CATALOG_RATING_FAILED:
      return state;
    case GET_ORGANIZATION_DATASETS_REQUESTED:
      return state
        .set('datasets', fromJS([]))
        .set('hasMoreDatasets', false)
        .set('datasetsPageSize', 0)
        .set('datasetsCount', 0);
    case GET_ORGANIZATION_DATASETS_SUCCEEDED:
      return state
        .set('datasets', fromJS(action.payload.datasets))
        .set('hasMoreDatasets', action.payload.hasMoreDatasets)
        .set('datasetsPageSize', action.payload.datasetsPageSize)
        .set('datasetsCount', action.payload.datasetsCount)
        .set('rating', fromJS(action.payload.rating));
    case GET_ORGANIZATION_DATASETS_FAILED:
      return state;
    case LOAD_MORE_ORGANIZATION_DATASETS_REQUESTED:
      return state;
    case LOAD_MORE_ORGANIZATION_DATASETS_SUCCEEDED:
      return state
        .update('datasets', (datasets: any) =>
          datasets.concat(fromJS(action.payload.datasets))
        )
        .set('datasetsPage', action.payload.page)
        .set('hasMoreDatasets', fromJS(action.payload.hasMoreDatasets));
    case LOAD_MORE_ORGANIZATION_DATASETS_FAILED:
      return state;
    case GET_ORGANIZATION_DATASET_REQUESTED:
      return state.set('dataset', null);
    case GET_ORGANIZATION_DATASET_SUCCEEDED:
      return state.set('dataset', fromJS(action.payload.dataset));
    case GET_ORGANIZATION_DATASET_FAILED:
      return state;
    case RESET_ORGANIZATION:
      return state.set('organization', null);
    default:
      return state;
  }
}
