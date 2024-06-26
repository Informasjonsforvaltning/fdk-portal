import _ from 'lodash';
import get from 'lodash/get';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import { getNewReferenceData } from '../../api/referenceData';
import { reduxFsaThunk } from '../../lib/redux-fsa-thunk';

export const REFERENCEEDATA_REQUEST = 'REFERENCEEDATA_REQUEST';
export const REFERENCEEDATA_SUCCESS = 'REFERENCEEDATA_SUCCESS';
export const REFERENCEEDATA_FAILURE = 'REFERENCEEDATA_FAILURE';

export const REFERENCEDATA_PATH_APISERVICETYPE = 'codes/apiservicetype';
export const REFERENCEDATA_PATH_APISTATUS = 'codes/apistatus';
export const REFERENCEDATA_PATH_DISTRIBUTIONTYPE = 'codes/distributiontype';
export const REFERENCEDATA_PATH_REFERENCETYPES = 'codes/referencetypes';
export const REFERENCEDATA_PATH_LOS = 'los';
export const REFERENCEDATA_PATH_THEMES = 'themes';
export const REFERENCEDATA_PATH_MEDIATYPES = 'codes/mediatypes';

function shouldFetch(metaState) {
  const threshold = 60 * 1000; // seconds
  return (
    !metaState ||
    (!metaState.isFetching &&
      (metaState.lastFetch || 0) < Date.now() - threshold)
  );
}

export function fetchReferenceDataIfNeededAction(path) {
  return (dispatch, getState) => {
    if (shouldFetch(_.get(getState(), ['referenceData', 'meta', path]))) {
      dispatch(
        reduxFsaThunk(() => getNewReferenceData(path), {
          onBeforeStart: { type: REFERENCEEDATA_REQUEST, meta: { path } },
          onSuccess: { type: REFERENCEEDATA_SUCCESS, meta: { path } },
          onError: { type: REFERENCEEDATA_FAILURE, meta: { path } }
        })
      );
    }
  };
}

const initialState = {
  items: {},
  meta: {}
};

export function referenceDataReducer(state, action) {
  if (!state) {
    state = initialState;
  }
  switch (action.type) {
    case REFERENCEEDATA_REQUEST:
      return {
        items: { ...state.items },
        meta: {
          ...state.meta,
          [action.meta.path]: { isFetching: true }
        }
      };

    case REFERENCEEDATA_SUCCESS: {
      return {
        items: {
          ...state.items,
          [action.meta.path]: action.payload
        },
        meta: {
          ...state.meta,
          [action.meta.path]: { isFetching: false, lastFetch: Date.now() }
        }
      };
    }
    case REFERENCEEDATA_FAILURE: {
      return {
        items: {
          ...state.items,
          [action.meta.path]: undefined
        },
        meta: {
          ...state.meta,
          [action.meta.path]: { isFetching: false, lastFetch: Date.now() }
        }
      };
    }
    default:
      return state;
  }
}

export const getReferenceDataByUri = (referenceData, path, uri) =>
  _.find(_.get(referenceData, ['items', path]), { uri });

export const getReferenceDataByCode = (referenceData, path, code) =>
  _.find(_.get(referenceData, ['items', path]), { code });

export const getLosStructure = referenceData => {
  const losList = get(referenceData, ['items', REFERENCEDATA_PATH_LOS], []);
  const losStructure = keyBy(losList, item =>
    get(item, ['losPaths', 0], '').toLowerCase()
  );

  return mapValues(
    losStructure,
    ({ name: prefLabel, isTema, uri, losPaths = [] }) => ({
      prefLabel,
      isTema,
      uri,
      losPaths
    })
  );
};

export const getThemesStructure = referenceData =>
  keyBy(get(referenceData, ['items', REFERENCEDATA_PATH_THEMES], []), 'code');

export const getMediaTypesByKey = referenceData =>
  keyBy(
    get(referenceData, ['items', REFERENCEDATA_PATH_MEDIATYPES], []),
    'code'
  );
