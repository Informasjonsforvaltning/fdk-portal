import {
  GET_CONCEPTS_REQUESTED,
  GET_CONCEPTS_SUCCEEDED,
  GET_CONCEPTS_FAILED
} from './action-types';

import { Concept } from '../../../types';

export function getConceptsRequested(params: object) {
  return {
    type: GET_CONCEPTS_REQUESTED,
    payload: {
      params
    }
  };
}

export function getConceptsSucceeded(concepts: Concept[]) {
  return {
    type: GET_CONCEPTS_SUCCEEDED,
    payload: {
      concepts
    }
  };
}

export function getConceptsFailed(message: string) {
  return {
    type: GET_CONCEPTS_FAILED,
    payload: {
      message
    }
  };
}
