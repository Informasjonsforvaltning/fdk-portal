import {
  GET_ASSESSMENT_REQUESTED,
  GET_ASSESSMENT_SUCCEEDED,
  GET_ASSESSMENT_FAILED,
  GET_ASSESSMENTS_REQUESTED,
  GET_ASSESSMENTS_SUCCEEDED,
  GET_CATALOG_RATING_REQUESTED,
  GET_CATALOG_RATING_SUCCEEDED,
  LOAD_MORE_ASSESSMENTS_REQUESTED,
  LOAD_MORE_ASSESSMENTS_SUCCEEDED,
  LOAD_MORE_ASSESSMENTS_FAILED,
  GET_ASSESSMENTS_FAILED,
  GET_CATALOG_RATING_FAILED
} from './action-types';

import type { Assessment, PagedAssessments, Rating } from '../../../types';

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
  context: string
) {
  return {
    type: GET_CATALOG_RATING_REQUESTED,
    payload: {
      catalogId,
      entityType,
      context
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

export function getPagedAssessmentsRequested(
  catalogId: string,
  entityType: string,
  context: string,
  page: number
) {
  return {
    type: GET_ASSESSMENTS_REQUESTED,
    payload: {
      catalogId,
      entityType,
      context,
      page
    }
  };
}

export function getPagedAssessmentsSucceeded(
  pagedAssessments: PagedAssessments
) {
  return {
    type: GET_ASSESSMENTS_SUCCEEDED,
    payload: {
      assessments: pagedAssessments.content,
      totalAssessments: pagedAssessments.totalElements,
      assessmentPageSize: pagedAssessments.size,
      assessmentsPage: pagedAssessments.number,
      hasMoreAssessments:
        pagedAssessments.number + 1 < pagedAssessments.totalPages
    }
  };
}

export function getPagedAssessmentsFailed(message: string) {
  return {
    type: GET_ASSESSMENTS_FAILED,
    payload: {
      message
    }
  };
}

export function loadMoreAssessmentsRequested(
  catalogId: string,
  entityType: string,
  context: string,
  page: number
) {
  return {
    type: LOAD_MORE_ASSESSMENTS_REQUESTED,
    payload: {
      catalogId,
      entityType,
      context,
      page
    }
  };
}

export function loadMoreAssessmentsSucceeded(
  pagedAssessments: PagedAssessments
) {
  return {
    type: LOAD_MORE_ASSESSMENTS_SUCCEEDED,
    payload: {
      assessments: pagedAssessments.content,
      totalAssessments: pagedAssessments.totalElements,
      assessmentPageSize: pagedAssessments.size,
      assessmentsPage: pagedAssessments.number,
      hasMoreAssessments:
        pagedAssessments.number + 1 < pagedAssessments.totalPages
    }
  };
}

export function loadMoreAssessmentsFailed(message: string) {
  return {
    type: LOAD_MORE_ASSESSMENTS_FAILED,
    payload: {
      message
    }
  };
}
