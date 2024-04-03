import _ from 'lodash';
import { reduxFsaThunk } from '../../lib/redux-fsa-thunk';
import { resourceServiceApiGet } from '../../api/resource-service-api/host';

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

export function fetchFullConceptsToCompareIfNeededAction() {
  return (dispatch, getState) => {
    const ids = Object.keys(getState().conceptsCompare.items);
    ids
      .filter(id => !!id)
      .forEach(id => {
        if (
          shouldFetch(_.get(getState(), ['fullConceptsCompare', 'meta', id]))
        ) {
          dispatch(
            reduxFsaThunk(() => resourceServiceApiGet(`concepts/${id}`), {
              onBeforeStart: {
                type: FULL_CONCEPTSCOMPARE_REQUEST,
                meta: { id }
              },
              onSuccess: { type: FULL_CONCEPTSCOMPARE_SUCCESS, meta: { id } },
              onError: { type: FULL_CONCEPTSCOMPARE_FAILURE, meta: { id } }
            })
          );
        }
      });
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
export function fullConceptsCompareReducer(state = initialState, action) {
  switch (action.type) {
    case FULL_CONCEPTSCOMPARE_REQUEST:
      return {
        items: {
          ...state.items,
          [action.meta.id]: action.payload
        },
        meta: {
          ...state.meta,
          [action.meta.id]: { isFetching: true, lastFetch: Date.now() }
        }
      };
    case FULL_CONCEPTSCOMPARE_SUCCESS:
      return {
        items: {
          ...state.items,
          [action.meta.id]: action.payload
        },
        meta: {
          ...state.meta,
          [action.meta.id]: { isFetching: false, lastFetch: Date.now() }
        }
      };
    case FULL_CONCEPTSCOMPARE_FAILURE:
      return {
        items: {
          ...state.items,
          [action.meta.id]: undefined
        },
        meta: {
          ...state.meta,
          [action.meta.id]: { isFetching: false, lastFetch: null }
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
