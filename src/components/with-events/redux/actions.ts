import {
  GET_EVENTS_REQUESTED,
  GET_EVENTS_SUCCEEDED,
  GET_EVENTS_FAILED,
  RESET_EVENTS,
  GET_EVENTS_RELATIONS_REQUESTED,
  GET_EVENTS_RELATIONS_SUCCEEDED,
  GET_EVENTS_RELATIONS_FAILED,
  RESET_EVENTS_RELATIONS
} from './action-types';

import type { Event } from '../../../types';

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

export function getEventsRelationsRequested(params: GetEventsParams) {
  return {
    type: GET_EVENTS_RELATIONS_REQUESTED,
    payload: {
      params
    }
  };
}

export function getEventsRelationsSucceeded(events: Event[]) {
  return {
    type: GET_EVENTS_RELATIONS_SUCCEEDED,
    payload: {
      events
    }
  };
}

export function getEventsRelationsFailed(message: string) {
  return {
    type: GET_EVENTS_RELATIONS_FAILED,
    payload: {
      message
    }
  };
}

export function resetEventsRelations() {
  return {
    type: RESET_EVENTS_RELATIONS
  };
}
