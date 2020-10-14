import { getRdfData } from '../../api/rdfData';
import { reduxFsaThunk } from '../../lib/redux-fsa-thunk';

export const RDF_DATA_REQUEST = 'RDF_DATA_REQUEST';
export const RDF_DATA_SUCCESS = 'RDF_DATA_SUCCESS';
export const RDF_DATA_FAILURE = 'RDF_DATA_FAILURE';

function shouldFetch(metaState) {
  const threshold = 60 * 1000; // seconds
  return (
    !metaState ||
    (!metaState.isFetching &&
      (metaState.lastFetch || 0) < Date.now() - threshold)
  );
}

export function fetchRDFDataIfNeededAction(id) {
  return (dispatch, getState) => {
    const {
      rdfData: { meta }
    } = getState();

    if (shouldFetch(meta)) {
      dispatch(
        reduxFsaThunk(() => getRdfData(id), {
          onBeforeStart: { type: RDF_DATA_REQUEST },
          onSuccess: { type: RDF_DATA_SUCCESS },
          onError: { type: RDF_DATA_FAILURE }
        })
      );
    }
  };
}

const initialState = {
  data: null,
  meta: {}
};

export function rdfDataReducer(state = initialState, action) {
  switch (action.type) {
    case RDF_DATA_REQUEST:
      return {
        ...state,
        meta: {
          isFetching: true,
          lastFetch: null
        }
      };

    case RDF_DATA_SUCCESS: {
      return {
        ...state,
        meta: {
          isFetching: false,
          lastFetch: Date.now()
        },
        data: action.payload
      };
    }
    case RDF_DATA_FAILURE: {
      return {
        ...state,
        meta: {
          isFetching: false,
          lastFetch: null
        },
        data: null
      };
    }
    default:
      return state;
  }
}
