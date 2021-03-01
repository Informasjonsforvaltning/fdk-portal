import {
  GET_CONCEPTS_REQUESTED,
  GET_CONCEPTS_SUCCEEDED,
  GET_CONCEPTS_FAILED,
  RESET_CONCEPTS,
  GET_CONCEPTS_RELATIONS_REQUESTED,
  GET_CONCEPTS_RELATIONS_SUCCEEDED,
  GET_CONCEPTS_RELATIONS_FAILED,
  RESET_CONCEPTS_RELATIONS
} from './action-types';

import { Concept } from '../../../types';

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

export function resetConcepts() {
  return {
    type: RESET_CONCEPTS
  };
}

export function getConceptsRelationsRequested(params: GetConceptsParams) {
  return {
    type: GET_CONCEPTS_RELATIONS_REQUESTED,
    payload: {
      params
    }
  };
}

export function getConceptsRelationsSucceeded(concepts: Concept[]) {
  return {
    type: GET_CONCEPTS_RELATIONS_SUCCEEDED,
    payload: {
      concepts
    }
  };
}

export function getConceptsRelationsFailed(message: string) {
  return {
    type: GET_CONCEPTS_RELATIONS_FAILED,
    payload: {
      message
    }
  };
}

export function resetConceptsRelations() {
  return {
    type: RESET_CONCEPTS_RELATIONS
  };
}
