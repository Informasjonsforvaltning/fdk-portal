import {
  GET_CONCEPTS_REQUESTED,
  GET_CONCEPTS_SUCCEEDED,
  GET_CONCEPTS_FAILED,
  RESET_CONCEPTS
} from './action-types';

import { SearchObject } from '../../../types';

interface GetConceptsParams {
  identifiers?: string[];
  size?: number;
  seeAlso?: string;
}

export function getConceptsRequested(params: GetConceptsParams) {
  return {
    type: GET_CONCEPTS_REQUESTED,
    payload: {
      params
    }
  };
}

export function getConceptsSucceeded(concepts: SearchObject[]) {
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

export function resetConcepts() {
  return {
    type: RESET_CONCEPTS
  };
}
