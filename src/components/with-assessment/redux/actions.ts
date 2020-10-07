import {
  GET_ASSESSMENT_REQUESTED,
  GET_ASSESSMENT_SUCCEEDED,
  GET_ASSESSMENT_FAILED
} from './action-types';

import type { Assessment } from '../../../types';

export function getAssessmentRequested(uri: string) {
  return {
    type: GET_ASSESSMENT_REQUESTED,
    payload: {
      uri
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
