import {
  SEARCH_TOPICS_REQUESTED,
  SEARCH_TOPICS_SUCCEEDED,
  SEARCH_TOPICS_FAILED,
  RESET_TOPICS
} from './action-types';

import type { CommunityTopic } from '../../../types';

export function searchTopicsRequested(queryTerm: string) {
  return {
    type: SEARCH_TOPICS_REQUESTED,
    payload: {
      queryTerm
    }
  };
}

export function searchTopicsSucceeded(topics: CommunityTopic[]) {
  return {
    type: SEARCH_TOPICS_SUCCEEDED,
    payload: {
      topics
    }
  };
}

export function searchTopicsFailed(message: string) {
  return {
    type: SEARCH_TOPICS_FAILED,
    payload: {
      message
    }
  };
}

export function resetTopics() {
  return {
    type: RESET_TOPICS
  };
}
