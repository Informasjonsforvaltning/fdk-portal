import {
  GET_ORGANIZATION_REQUESTED,
  GET_ORGANIZATION_SUCCEEDED,
  GET_ORGANIZATION_FAILED,
  GET_ENHETSREGISTERET_ORGANIZATION_REQUESTED,
  GET_ENHETSREGISTERET_ORGANIZATION_SUCCEEDED,
  GET_ENHETSREGISTERET_ORGANIZATION_FAILED,
  GET_ORGANIZATION_RATING_REQUESTED,
  GET_ORGANIZATION_RATING_SUCCEEDED,
  GET_ORGANIZATION_RATING_FAILED,
  RESET_ORGANIZATION
} from './action-types';

import type {
  Publisher,
  OrganizationCountsAndRating,
  EnhetsregisteretOrganization
} from '../../../types';

export function getOrganizationRequested(id: string) {
  return {
    type: GET_ORGANIZATION_REQUESTED,
    payload: {
      id
    }
  };
}

export function getOrganizationSucceeded(organization: Publisher) {
  return {
    type: GET_ORGANIZATION_SUCCEEDED,
    payload: {
      organization
    }
  };
}

export function getOrganizationFailed(message: string) {
  return {
    type: GET_ORGANIZATION_FAILED,
    payload: {
      message
    }
  };
}

export function getEnhetsregisteretOrganizationRequested(id: string) {
  return {
    type: GET_ENHETSREGISTERET_ORGANIZATION_REQUESTED,
    payload: {
      id
    }
  };
}

export function getEnhetsregisteretOrganizationSucceeded(
  organization: EnhetsregisteretOrganization
) {
  return {
    type: GET_ENHETSREGISTERET_ORGANIZATION_SUCCEEDED,
    payload: {
      organization
    }
  };
}

export function getEnhetsregisteretOrganizationFailed(message: string) {
  return {
    type: GET_ENHETSREGISTERET_ORGANIZATION_FAILED,
    payload: {
      message
    }
  };
}

export function getOrganizationRatingRequested(id: string, filter?: string) {
  return {
    type: GET_ORGANIZATION_RATING_REQUESTED,
    payload: {
      id,
      filter
    }
  };
}

export function getOrganizationRatingSucceeded(
  rating: OrganizationCountsAndRating
) {
  return {
    type: GET_ORGANIZATION_RATING_SUCCEEDED,
    payload: {
      rating
    }
  };
}

export function getOrganizationRatingFailed(message: string) {
  return {
    type: GET_ORGANIZATION_RATING_FAILED,
    payload: {
      message
    }
  };
}

export function resetOrganization() {
  return {
    type: RESET_ORGANIZATION
  };
}
