import {
  GET_EVENTS_REQUESTED,
  GET_EVENTS_SUCCEEDED,
  GET_EVENTS_FAILED,
  RESET_EVENTS
} from './action-types';

import type { Event } from '../../../types';

interface GetEventsParams {
  size?: number;
}

export function getEventsRequested(params: GetEventsParams) {
  return {
    type: GET_EVENTS_REQUESTED,
    payload: {
      params
    }
  };
}

export function getEventsSucceeded(events: Event[]) {
  return {
    type: GET_EVENTS_SUCCEEDED,
    payload: {
      events
    }
  };
}

export function getEventsFailed(message: string) {
  return {
    type: GET_EVENTS_FAILED,
    payload: {
      message
    }
  };
}

export function resetEvents() {
  return {
    type: RESET_EVENTS
  };
}
