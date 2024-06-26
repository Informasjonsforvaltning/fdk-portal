import _ from 'lodash';
import qs from 'qs';

import { reduxFsaThunk } from '../../lib/redux-fsa-thunk';
import {
  extractDatasetAggregations,
  searchDatasets,
  extractDatasets,
  extractDatasetsTotal
} from '../../api/search-api/datasets';
import { paramsToSearchBody } from '../../utils/common/index';

export const DATASETS_REQUEST = 'DATASETS_REQUEST';
export const DATASETS_SUCCESS = 'DATASETS_SUCCESS';
export const DATASETS_FAILURE = 'DATASETS_FAILURE';

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

export function fetchDatasetsIfNeededAction(query) {
  const queryKey = generateQueryKey(query);
  const params = {
    ...query,
    aggregations: 'accessRights,opendata,theme,orgPath,provenance,spatial,los'
  };
  return (dispatch, getState) =>
    shouldFetch(_.get(getState(), ['datasets', 'meta']), queryKey) &&
    dispatch(
      reduxFsaThunk(() => searchDatasets(paramsToSearchBody(params)), {
        onBeforeStart: { type: DATASETS_REQUEST, meta: { queryKey } },
        onSuccess: { type: DATASETS_SUCCESS, meta: { queryKey } },
        onError: { type: DATASETS_FAILURE, meta: { queryKey } }
      })
    );
}

const initialState = {};

export function datasetsReducer(state, action) {
  state = state || initialState;
  switch (action.type) {
    case DATASETS_REQUEST:
      return {
        ...state,
        meta: {
          isFetching: true,
          lastFetch: null,
          queryKey: action.meta.queryKey
        }
      };
    case DATASETS_SUCCESS:
      return {
        ...state,
        datasetItems: extractDatasets(action.payload),
        datasetAggregations: extractDatasetAggregations(action.payload),
        datasetTotal: extractDatasetsTotal(action.payload),
        meta: {
          isFetching: false,
          lastFetch: Date.now(),
          queryKey: action.meta.queryKey
        }
      };
    case DATASETS_FAILURE:
      return {
        ...state,
        datasetItems: null,
        datasetAggregations: null,
        datasetTotal: null,
        meta: {
          isFetching: false,
          lastFetch: Date.now(),
          queryKey: action.meta.queryKey,
          error: action.payload
        }
      };
    default:
      return state;
  }
}
