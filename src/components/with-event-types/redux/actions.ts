import {
  GET_EVENT_TYPES_REQUESTED,
  GET_EVENT_TYPES_SUCCEEDED,
  GET_EVENT_TYPES_FAILED,
  RESET_EVENT_TYPES
} from './action-types';

import type { EventType } from '../../../types';

export function getEventTypesRequested() {
  return {
    type: GET_EVENT_TYPES_REQUESTED
  };
}

export function getEventTypesSucceeded(eventTypes: EventType[]) {
  return {
    type: GET_EVENT_TYPES_SUCCEEDED,
    payload: {
      eventTypes
    }
  };
}

export function getEventTypesFailed(message: string) {
  return {
    type: GET_EVENT_TYPES_FAILED,
    payload: {
      message
    }
  };
}

export function resetEventTypes() {
  return {
    type: RESET_EVENT_TYPES
  };
}
