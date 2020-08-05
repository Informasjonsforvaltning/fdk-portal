import _ from 'lodash';
import qs from 'qs';

import {
  extractDataServiceAggregations,
  searchDataServices,
  extractDataServices,
  extractDataServicesTotal,
  paramsToSearchBody
} from '../../api/search-fulltext-api/dataservices';
import { reduxFsaThunk } from '../../lib/redux-fsa-thunk';

export const DATA_SERVICES_REQUEST = 'DATA_SERVICES_REQUEST';
export const DATA_SERVICES_SUCCESS = 'DATA_SERVICES_SUCCESS';
export const DATA_SERVICES_FAILURE = 'DATA_SERVICES_FAILURE';

const generateQueryKey = query => qs.stringify(query, { skipNulls: true });

function shouldFetch(metaState, queryKey) {
  const threshold = 60 * 1000; // seconds
  return (
    !metaState ||
    (!metaState.isFetching &&
      ((metaState.lastFetch || 0) < Date.now() - threshold ||
        metaState.queryKey !== queryKey))
  );
}

export function fetchDataServicesIfNeededAction(query) {
  const queryKey = generateQueryKey(query);
  const params = { ...query, aggregations: 'formats,orgPath' };

  return (dispatch, getState) =>
    shouldFetch(_.get(getState(), ['dataServices', 'meta']), queryKey) &&
    dispatch(
      reduxFsaThunk(() => searchDataServices(paramsToSearchBody(params)), {
        onBeforeStart: { type: DATA_SERVICES_REQUEST, meta: { queryKey } },
        onSuccess: { type: DATA_SERVICES_SUCCESS, meta: { queryKey } },
        onError: { type: DATA_SERVICES_FAILURE, meta: { queryKey } }
      })
    );
}

const initialState = {};

export function dataServicesReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_SERVICES_REQUEST:
      return {
        ...state,
        meta: {
          isFetching: true,
          lastFetch: null,
          queryKey: action.meta.queryKey
        }
      };
    case DATA_SERVICES_SUCCESS:
      return {
        ...state,
        dataServiceItems: extractDataServices(action.payload),
        dataServiceAggregations: extractDataServiceAggregations(action.payload),
        dataServiceTotal: extractDataServicesTotal(action.payload),
        meta: {
          isFetching: false,
          lastFetch: Date.now(),
          queryKey: action.meta.queryKey
        }
      };
    case DATA_SERVICES_FAILURE:
      return {
        ...state,
        dataServiceItems: null,
        dataServiceAggregations: null,
        dataServiceTotal: null,
        meta: {
          isFetching: false,
          lastFetch: null, // retry on error
          queryKey: action.meta.queryKey,
          error: action.payload
        }
      };
    default:
      return state;
  }
}
