import {
  GET_AI_PROJECTS_REQUESTED,
  GET_AI_PROJECTS_SUCCEEDED,
  GET_AI_PROJECTS_FAILED
} from './action-types';

import { type AiProject } from '../../../types';

export function getAiProjectsRequested() {
  return {
    type: GET_AI_PROJECTS_REQUESTED
  };
}

export function getAiProjectsSucceeded(data: AiProject[]) {
  return {
    type: GET_AI_PROJECTS_SUCCEEDED,
    payload: {
      data
    }
  };
}

export function getAiProjectsFailed(message: string) {
  return {
    type: GET_AI_PROJECTS_FAILED,
    payload: {
      message
    }
  };
}
