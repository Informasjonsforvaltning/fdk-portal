import _ from 'lodash';
import { reduxFsaThunk } from '../../lib/redux-fsa-thunk';
import { resourceServiceApiPost } from '../../api/resource-service-api/host';

export const FULL_CONCEPTSCOMPARE_REQUEST = 'FULL_CONCEPTSCOMPARE_REQUEST';
export const FULL_CONCEPTSCOMPARE_SUCCESS = 'FULL_CONCEPTSCOMPARE_SUCCESS';
export const FULL_CONCEPTSCOMPARE_FAILURE = 'FULL_CONCEPTSCOMPARE_FAILURE';

export const ADD_FULL_CONCEPT_TO_COMPARE = 'ADD_FULL_CONCEPT_TO_COMPARE';
export const REMOVE_FULL_CONCEPT_TO_COMPARE = 'REMOVE_FULL_CONCEPT_TO_COMPARE';

function shouldFetch(metaState) {
  const threshold = 60 * 1000; // seconds
  return (
    !metaState ||
    (!metaState.isFetching &&
      (metaState.lastFetch || 0) < Date.now() - threshold)
  );
}

export function fetchFullConceptsToCompareIfNeededAction(iDs) {
  return (dispatch, getState) => {
    const ids = iDs.filter(
      id =>
        !!id &&
        shouldFetch(_.get(getState(), ['fullConceptsCompare', 'meta', id]))
    );
    dispatch(
      reduxFsaThunk(() => resourceServiceApiPost(`concepts`, { ids }), {
        onBeforeStart: {
          type: FULL_CONCEPTSCOMPARE_REQUEST,
          meta: { ids }
        },
        onSuccess: { type: FULL_CONCEPTSCOMPARE_SUCCESS, meta: { ids } },
        onError: { type: FULL_CONCEPTSCOMPARE_FAILURE, meta: { ids } }
      })
    );
  };
}

export function addFullConceptAction(item) {
  return {
    type: ADD_FULL_CONCEPT_TO_COMPARE,
    conceptItem: item
  };
}

export function removeFullConceptAction(id) {
  return {
    type: REMOVE_FULL_CONCEPT_TO_COMPARE,
    id
  };
}

const initialState = {
  items: {},
  meta: {}
};

// eslint-disable-next-line default-param-last
export function fullConceptsCompareReducer(state, action) {
  state = state || initialState;
  switch (action.type) {
    case FULL_CONCEPTSCOMPARE_REQUEST:
      return {
        items: {
          ...state.items,
          ...action.meta.ids.reduce((acc, id) => {
            acc[id] = action.payload?.find(item => item.id === id);
            return acc;
          }, {})
        },
        ...action.meta.ids.reduce((acc, id) => {
          acc[id] = { isFetching: true };
          return acc;
        }, {})
      };
    case FULL_CONCEPTSCOMPARE_SUCCESS:
      return {
        items: {
          ...state.items,
          ...action.meta.ids.reduce((acc, id) => {
            acc[id] = action.payload?.find(item => item.id === id);
            return acc;
          }, {})
        },
        meta: {
          ...state.meta,
          ...action.meta.ids.reduce((acc, id) => {
            acc[id] = { isFetching: false, lastFetch: Date.now() };
            return acc;
          }, {})
        }
      };
    case FULL_CONCEPTSCOMPARE_FAILURE:
      return {
        items: {
          ...state.items,
          ...action.meta.ids.reduce((acc, id) => {
            acc[id] = undefined;
            return acc;
          }, {})
        },
        meta: {
          ...state.meta,
          ...action.meta.ids.reduce((acc, id) => {
            acc[id] = { isFetching: false, lastFetch: Date.now() };
            return acc;
          }, {})
        }
      };
    case ADD_FULL_CONCEPT_TO_COMPARE:
      return {
        items: {
          ...state.items,
          [action.conceptItem.id]: action.conceptItem
        },
        meta: {
          ...state.meta,
          [action.conceptItem.id]: { isFetching: false, lastFetch: Date.now() }
        }
      };
    case REMOVE_FULL_CONCEPT_TO_COMPARE:
      return {
        items: Object.keys(state.items).reduce((accumulator, key) => {
          if (key !== action.id) {
            accumulator[key] = state.items[key];
          }
          return accumulator;
        }, {})
      };
    default:
      return state;
  }
}
