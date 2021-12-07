import {
  GET_SEARCH_SUGGESTIONS_REQUESTED,
  GET_SEARCH_SUGGESTIONS_SUCCEEDED,
  GET_SEARCH_SUGGESTIONS_FAILED,
  RESET_SEARCH_SUGGESTIONS
} from './action-types';

import type { SearchSuggestion } from '../../../types';

export function getSearchSuggestionsRequested(
  query: string,
  isNap: boolean,
  searchEntity?: string
) {
  return {
    type: GET_SEARCH_SUGGESTIONS_REQUESTED,
    payload: {
      query,
      isNap,
      searchEntity
    }
  };
}

export function getSearchSuggestionsSucceeded(
  suggestions: SearchSuggestion[],
  query: string
) {
  return {
    type: GET_SEARCH_SUGGESTIONS_SUCCEEDED,
    payload: {
      suggestions,
      query
    }
  };
}

export function getSearchSuggestionsFailed(message: string) {
  return {
    type: GET_SEARCH_SUGGESTIONS_FAILED,
    payload: {
      message
    }
  };
}

export function resetSearchSuggestions() {
  return {
    type: RESET_SEARCH_SUGGESTIONS
  };
}
