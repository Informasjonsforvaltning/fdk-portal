import type { ESPage, Event, PublicService } from '../../../types';

import {
  GET_PUBLIC_SERVICES_AND_EVENTS_REQUESTED,
  GET_PUBLIC_SERVICES_AND_EVENTS_SUCCEEDED,
  GET_PUBLIC_SERVICES_AND_EVENTS_FAILED,
  RESET_PUBLIC_SERVICES_AND_EVENTS
} from './action-types';

interface GetPublicServicesAndEventsParams {
  q?: any;
  page?: number;
  sortfield?: string;
  size?: number;
  orgPath?: string;
  keyword?: string[];
  uri?: string[];
}

export function getPublicServicesAndEventsRequested(
  params: GetPublicServicesAndEventsParams
) {
  return {
    type: GET_PUBLIC_SERVICES_AND_EVENTS_REQUESTED,
    payload: {
      params
    }
  };
}

export function getPublicServicesAndEventsSucceeded(
  hits: (Event | PublicService)[],
  aggregations: any,
  page: ESPage
) {
  return {
    type: GET_PUBLIC_SERVICES_AND_EVENTS_SUCCEEDED,
    payload: {
      hits,
      aggregations,
      page
    }
  };
}

export function getPublicServicesAndEventsFailed(message: string) {
  return {
    type: GET_PUBLIC_SERVICES_AND_EVENTS_FAILED,
    payload: {
      message
    }
  };
}

export function resetPublicServicesAndEvents() {
  return {
    type: RESET_PUBLIC_SERVICES_AND_EVENTS
  };
}
