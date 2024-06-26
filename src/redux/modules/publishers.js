import _ from 'lodash';
import keyBy from 'lodash/keyBy';
import { reduxFsaThunk } from '../../lib/redux-fsa-thunk';
import {
  getOrganizations,
  extractOrganizations
} from '../../api/organization-catalogs-api/organizations';

export const PUBLISHERS_REQUEST = 'PUBLISHERS_REQUEST';
export const PUBLISHERS_SUCCESS = 'PUBLISHERS_SUCCESS';
export const PUBLISHERS_FAILURE = 'PUBLISHERS_FAILURE';

function shouldFetch(metaState) {
  const threshold = 60 * 1000; // seconds
  return (
    !metaState ||
    (!metaState.isFetching &&
      (metaState.lastFetch || 0) < Date.now() - threshold)
  );
}

export function fetchPublishersIfNeededAction() {
  return (dispatch, getState) => {
    if (shouldFetch(_.get(getState(), ['publishers', 'meta']))) {
      dispatch(
        reduxFsaThunk(() => getOrganizations().then(extractOrganizations), {
          onBeforeStart: { type: PUBLISHERS_REQUEST },
          onSuccess: { type: PUBLISHERS_SUCCESS },
          onError: { type: PUBLISHERS_FAILURE }
        })
      );
    }
  };
}

const initialState = { meta: {}, publisherItems: {} };

export function publishersReducer(state, action) {
  if (!state) {
    state = initialState;
  }
  switch (action.type) {
    case PUBLISHERS_REQUEST: {
      return {
        ...state,
        meta: {
          isFetching: true
        }
      };
    }
    case PUBLISHERS_SUCCESS: {
      return {
        ...state,
        meta: {
          isFetching: false,
          lastFetch: Date.now()
        },
        publisherItems: keyBy(action.payload, 'orgPath')
      };
    }
    case PUBLISHERS_FAILURE: {
      return {
        ...state,
        meta: {
          isFetching: false,
          lastFetch: Date.now()
        },
        publisherItems: null
      };
    }
    default:
      return state;
  }
}

export const getPublisherByOrgNr = (publisherItems, id) => {
  if (publisherItems) {
    return _.find(publisherItems, ['id', id]);
  }
  return null;
};
