import {
  GET_EVENT_REQUESTED,
  GET_EVENT_SUCCEEDED,
  GET_EVENT_FAILED,
  RESET_EVENT
} from './action-types';

import type { Event } from '../../../types';

export function getEventRequested(id: string) {
  return {
    type: GET_EVENT_REQUESTED,
    payload: {
      id
    }
  };
}

export function getEventSucceeded(event: Event) {
  return {
    type: GET_EVENT_SUCCEEDED,
    payload: {
      event
    }
  };
}

export function getEventFailed(message: string) {
  return {
    type: GET_EVENT_FAILED,
    payload: {
      message
    }
  };
}

export function resetEvent() {
  return {
    type: RESET_EVENT
  };
}
