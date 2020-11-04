import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import env from '../../../env';

import {
  GET_INFORMATION_MODEL_REQUESTED,
  GET_INFORMATION_MODEL_RDF_REPRESENTATIONS_REQUESTED
} from './action-types';
import * as actions from './actions';

import {
  searchInformationModels,
  paramsToSearchBody,
  extractFirstInformationModel
} from '../../../api/search-fulltext-api/informationmodels';

import type { InformationModel } from '../../../types';

const { INFORMATIONMODEL_HARVESTER_HOST } = env;

function* getInformationModelRequested({
  payload: { id }
}: ReturnType<typeof actions.getInformationModelRequested>) {
  try {
    const data = yield call(
      searchInformationModels,
      paramsToSearchBody({ id })
    );

    if (data) {
      yield put(
        actions.getInformationModelSucceeded(
          extractFirstInformationModel(data) as InformationModel
        )
      );
    } else {
      yield put(actions.getInformationModelFailed(''));
    }
  } catch (e) {
    yield put(actions.getInformationModelFailed(e.message));
  }
}

function* getInformationModelRdfRepresentationsRequested({
  payload: { id, formats }
}: ReturnType<typeof actions.getInformationModelRdfRepresentationsRequested>) {
  try {
    const rdfRepresentations = yield all(
      formats.map(function* fetcher(format) {
        try {
          return {
            format,
            value: yield call(
              axios.get,
              `${INFORMATIONMODEL_HARVESTER_HOST}/informationmodels/${id}`,
              { headers: { accept: format } }
            )
          };
        } catch (error) {
          return { format, value: null };
        }
      })
    );

    if (rdfRepresentations && Array.isArray(rdfRepresentations)) {
      yield put(
        actions.getInformationModelRdfRepresentationsSucceeded(
          rdfRepresentations.reduce(
            (previous, { format, value }) => ({ ...previous, [format]: value }),
            {}
          )
        )
      );
    } else {
      yield put(actions.getInformationModelRdfRepresentationsFailed(''));
    }
  } catch (e) {
    yield put(actions.getInformationModelRdfRepresentationsFailed(e.message));
  }
}

export default function* saga() {
  yield all([
    takeLatest(GET_INFORMATION_MODEL_REQUESTED, getInformationModelRequested),
    takeLatest(
      GET_INFORMATION_MODEL_RDF_REPRESENTATIONS_REQUESTED,
      getInformationModelRdfRepresentationsRequested
    )
  ]);
}
