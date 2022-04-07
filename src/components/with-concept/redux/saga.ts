import { all, call, put, takeLatest } from 'redux-saga/effects';

import { GET_CONCEPT_REQUESTED } from './action-types';
import * as actions from './actions';

import LoggingService, { Severity } from '../../../services/logging';

import { getConcept } from '../../../services/api/harvester-bff';
import { Concept } from '../../../types';

function* getConceptRequested({
  payload: { id }
}: ReturnType<typeof actions.getConceptRequested>) {
  try {
    const concept: Concept = yield call(getConcept, id);

    if (concept) {
      yield put(actions.getConceptSucceeded(concept));
    } else {
      LoggingService.postLogEntry({
        message: `Could not get concept with ID: ${id}`,
        severity: Severity.WARN
      });
      yield put(actions.getConceptFailed(''));
    }
  } catch (error) {
    const { name, message, stack: trace } = error as Error;
    LoggingService.postLogEntry({
      message:
        message ?? `Application error when getting concept with ID: ${id}`,
      severity: Severity.ERROR,
      name,
      trace
    });
    yield put(actions.getConceptFailed(message));
  }
}

export default function* saga() {
  yield all([takeLatest(GET_CONCEPT_REQUESTED, getConceptRequested)]);
}
