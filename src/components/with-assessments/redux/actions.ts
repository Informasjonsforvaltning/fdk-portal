import {
  GET_ASSESSMENTS_REQUESTED,
  GET_ASSESSMENTS_SUCCEEDED,
  LOAD_MORE_ASSESSMENTS_REQUESTED,
  LOAD_MORE_ASSESSMENTS_SUCCEEDED,
  LOAD_MORE_ASSESSMENTS_FAILED,
  GET_ASSESSMENTS_FAILED
} from './action-types';

import type { Assessment, Paged } from '../../../types';

export function getPagedAssessmentsRequested(
  catalogId: string,
  entityType: string,
  contexts: string,
  page: number
) {
  return {
    type: GET_ASSESSMENTS_REQUESTED,
    payload: {
      catalogId,
      entityType,
      contexts,
      page
    }
  };
}

export function getPagedAssessmentsSucceeded(
  pagedAssessments: Paged<Assessment>
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
  contexts: string,
  page: number
) {
  return {
    type: LOAD_MORE_ASSESSMENTS_REQUESTED,
    payload: {
      catalogId,
      entityType,
      contexts,
      page
    }
  };
}

export function loadMoreAssessmentsSucceeded(
  pagedAssessments: Paged<Assessment>
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
