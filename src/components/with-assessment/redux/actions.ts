import {
  GET_ASSESSMENT_REQUESTED,
  GET_ASSESSMENT_SUCCEEDED,
  GET_ASSESSMENT_FAILED,
  GET_CATALOG_RATING_REQUESTED,
  GET_CATALOG_RATING_SUCCEEDED,
  GET_CATALOG_RATING_FAILED
} from './action-types';

import type { Assessment, Rating } from '../../../types';

export function getAssessmentRequested(id: string) {
  return {
    type: GET_ASSESSMENT_REQUESTED,
    payload: {
      id
    }
  };
}

export function getAssessmentSucceeded(assessment: Assessment) {
  return {
    type: GET_ASSESSMENT_SUCCEEDED,
    payload: {
      assessment
    }
  };
}

export function getAssessmentFailed(message: string) {
  return {
    type: GET_ASSESSMENT_FAILED,
    payload: {
      message
    }
  };
}

export function getCatalogRatingRequested(
  catalogId: string,
  entityType: string,
  contexts: string
) {
  return {
    type: GET_CATALOG_RATING_REQUESTED,
    payload: {
      catalogId,
      entityType,
      contexts
    }
  };
}

export function getCatalogRatingSucceeded(catalogRating: Rating) {
  return {
    type: GET_CATALOG_RATING_SUCCEEDED,
    payload: catalogRating
  };
}

export function getCatalogRatingFailed(message: string) {
  return {
    type: GET_CATALOG_RATING_FAILED,
    payload: {
      message
    }
  };
}
