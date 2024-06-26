import _ from 'lodash';
import qs from 'qs';
import {
  extractConceptAggregations,
  searchConcepts,
  extractConcepts,
  extractConceptsTotal
} from '../../api/search-api/concepts';
import {
  informationmodelsSearch,
  extractInformationmodels
} from '../../api/informationmodels';
import { reduxFsaThunk } from '../../lib/redux-fsa-thunk';
import { paramsToSearchBody } from '../../utils/common/index';

export const CONCEPTS_REQUEST = 'CONCEPTS_REQUEST';
export const CONCEPTS_SUCCESS = 'CONCEPTS_SUCCESS';
export const CONCEPTS_FAILURE = 'CONCEPTS_FAILURE';
export const CONCEPT_REFERENCES_REQUEST = 'CONCEPT_REFERENCES_REQUEST';
export const CONCEPT_REFERENCES_SUCCESS = 'CONCEPT_REFERENCES_SUCCESS';
export const CONCEPT_REFERENCES_FAILURE = 'CONCEPT_REFERENCES_FAILURE';
export const INFORMATION_MODEL_REFERENCES_REQUEST =
  'INFORMATION_MODEL_REFERENCES_REQUEST';
export const INFORMATION_MODEL_REFERENCES_SUCCESS =
  'INFORMATION_MODEL_REFERENCES_SUCCESS';
export const INFORMATION_MODEL_REFERENCES_FAILURE =
  'INFORMATION_MODEL_REFERENCES_FAILURE';

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

export function fetchConceptsIfNeededAction(query) {
  const queryKey = generateQueryKey(query);
  const params = { ...query, aggregations: 'orgPath' };

  return (dispatch, getState) =>
    shouldFetch(_.get(getState(), ['concepts', 'meta']), queryKey) &&
    dispatch(
      reduxFsaThunk(() => searchConcepts(paramsToSearchBody(params)), {
        onBeforeStart: { type: CONCEPTS_REQUEST, meta: { queryKey } },
        onSuccess: { type: CONCEPTS_SUCCESS, meta: { queryKey } },
        onError: { type: CONCEPTS_FAILURE, meta: { queryKey } }
      })
    );
}

export function fetchConceptReferencesAction(query) {
  const queryKey = generateQueryKey(query);
  const params = { ...query, aggregations: 'orgPath' };

  return (dispatch, getState) =>
    shouldFetch(_.get(getState(), ['concepts', 'meta']), queryKey) &&
    dispatch(
      reduxFsaThunk(() => searchConcepts(paramsToSearchBody(params)), {
        onBeforeStart: { type: CONCEPT_REFERENCES_REQUEST, meta: { queryKey } },
        onSuccess: { type: CONCEPT_REFERENCES_SUCCESS, meta: { queryKey } },
        onError: { type: CONCEPT_REFERENCES_FAILURE, meta: { queryKey } }
      })
    );
}

export function fetchInformationModelReferencesAction(query) {
  const queryKey = generateQueryKey(query);
  return (dispatch, getState) =>
    shouldFetch(_.get(getState(), ['concepts', 'meta']), queryKey) &&
    dispatch(
      reduxFsaThunk(() => informationmodelsSearch(query), {
        onBeforeStart: {
          type: INFORMATION_MODEL_REFERENCES_REQUEST,
          meta: { queryKey }
        },
        onSuccess: {
          type: INFORMATION_MODEL_REFERENCES_SUCCESS,
          meta: { queryKey }
        },
        onError: {
          type: INFORMATION_MODEL_REFERENCES_FAILURE,
          meta: { queryKey }
        }
      })
    );
}

const initialState = {};

export function conceptReducer(state, action) {
  if (!state) {
    state = initialState;
  }
  switch (action.type) {
    case CONCEPTS_REQUEST:
      return {
        ...state,
        meta: {
          isFetching: true,
          queryKey: action.meta.queryKey
        }
      };
    case CONCEPTS_SUCCESS:
      return {
        ...state,
        conceptItems: extractConcepts(action.payload),
        conceptAggregations: extractConceptAggregations(action.payload),
        conceptTotal: extractConceptsTotal(action.payload),
        meta: {
          isFetching: false,
          lastFetch: Date.now(),
          queryKey: action.meta.queryKey
        }
      };
    case CONCEPTS_FAILURE:
      return {
        ...state,
        conceptItems: null,
        conceptAggregations: null,
        conceptTotal: null,
        meta: {
          isFetching: false,
          lastFetch: Date.now(),
          queryKey: action.meta.queryKey,
          error: action.payload
        }
      };
    case CONCEPT_REFERENCES_REQUEST:
      return {
        ...state,
        conceptReferences: extractConcepts(action.payload),
        meta: {
          isFetching: true,
          queryKey: action.meta.queryKey
        }
      };
    case CONCEPT_REFERENCES_SUCCESS:
      return {
        ...state,
        conceptReferences: extractConcepts(action.payload),
        meta: {
          isFetching: false,
          lastFetch: Date.now(),
          queryKey: action.meta.queryKey
        }
      };
    case CONCEPT_REFERENCES_FAILURE:
      return {
        ...state,
        conceptReferences: extractConcepts(action.payload),
        meta: {
          isFetching: false,
          lastFetch: Date.now(),
          queryKey: action.meta.queryKey
        }
      };
    case INFORMATION_MODEL_REFERENCES_REQUEST:
      return {
        ...state,
        informationModelReferences: [],
        meta: {
          isFetching: true,
          queryKey: action.meta.queryKey
        }
      };
    case INFORMATION_MODEL_REFERENCES_SUCCESS:
      return {
        ...state,
        informationModelReferences: extractInformationmodels(action.payload),
        meta: {
          isFetching: false,
          lastFetch: Date.now(),
          queryKey: action.meta.queryKey
        }
      };
    case INFORMATION_MODEL_REFERENCES_FAILURE:
      return {
        ...state,
        informationModelReferences: [],
        meta: {
          isFetching: false,
          lastFetch: Date.now(),
          queryKey: action.meta.queryKey
        }
      };
    default:
      return state;
  }
}
