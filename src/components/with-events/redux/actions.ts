import {
  GET_EVENTS_REQUESTED,
  GET_EVENTS_SUCCEEDED,
  GET_EVENTS_FAILED,
  RESET_EVENTS
} from './action-types';

import type { SearchObject } from '../../../types';

interface GetEventsParams {
  size?: number;
  relation?: string;
  uris?: string[];
}

export function getEventsRequested(params: GetEventsParams) {
  return {
    type: GET_EVENTS_REQUESTED,
    payload: {
      params
    }
  };
}

export function getEventsSucceeded(events: SearchObject[]) {
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
