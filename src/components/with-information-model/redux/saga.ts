import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import env from '../../../env';

import {
  GET_INFORMATION_MODEL_REQUESTED,
  GET_INFORMATION_MODEL_RDF_REPRESENTATIONS_REQUESTED
} from './action-types';
import * as actions from './actions';

import type { InformationModel } from '../../../types';
import { DataFormat } from '../../../types/enums';

const { SEARCH_API_HOST, INFORMATIONMODEL_HARVESTER_HOST } = env;

function* getInformationModelRequested({
  payload: { id }
}: ReturnType<typeof actions.getInformationModelRequested>) {
  try {
    const { data } = yield call(
      axios.get,
      `${SEARCH_API_HOST}/information-models/${id}`
    );

    if (data) {
      yield put(actions.getInformationModelSucceeded(data as InformationModel));
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
          const { data } = yield call(
            axios.get,
            `${INFORMATIONMODEL_HARVESTER_HOST}/informationmodels/${id}`,
            { headers: { accept: format } }
          );

          return {
            format,
            value: [DataFormat.JSON, DataFormat.JSONLD].includes(format)
              ? JSON.stringify(data, null, 2)
              : data
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
