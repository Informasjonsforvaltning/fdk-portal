import {
  GET_CONCEPT_REQUESTED,
  GET_CONCEPT_SUCCEEDED,
  GET_CONCEPT_FAILED
} from './action-types';

import type { Concept } from '../../../types';

export function getConceptRequested(id: string) {
  return {
    type: GET_CONCEPT_REQUESTED,
    payload: {
      id
    }
  };
}

export function getConceptSucceeded(concept: Concept) {
  return {
    type: GET_CONCEPT_SUCCEEDED,
    payload: {
      concept
    }
  };
}

export function getConceptFailed(message: string) {
  return {
    type: GET_CONCEPT_FAILED,
    payload: {
      message
    }
  };
}
