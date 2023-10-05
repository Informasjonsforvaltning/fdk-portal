import {
  SEARCH_TOPICS_REQUESTED,
  SEARCH_TOPICS_SUCCEEDED,
  SEARCH_TOPICS_FAILED,
  GET_RECENT_POSTS_REQUESTED,
  GET_RECENT_POSTS_SUCCEEDED,
  GET_RECENT_POSTS_FAILED,
  RESET_TOPICS,
  RESET_POSTS,
  GET_REQUESTS,
  GET_REQUESTS_FAILED,
  GET_REQUESTS_SUCCEEDED
} from './action-types';

import type {
  CommunityPost,
  CommunityRequestCategory,
  CommunityTopic
} from '../../../types';
import { CommunityTerm } from '../../../types/enums';

export function searchTopicsRequested(queryTerm: string) {
  return {
    type: SEARCH_TOPICS_REQUESTED,
    payload: {
      queryTerm
    }
  };
}

export function searchTopicsSucceeded(
  topics: CommunityTopic[],
  multiplePages: boolean
) {
  return {
    type: SEARCH_TOPICS_SUCCEEDED,
    payload: {
      topics,
      multiplePages
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

export function getRecentPostsRequested(term: CommunityTerm) {
  return {
    type: GET_RECENT_POSTS_REQUESTED,
    payload: {
      term
    }
  };
}

export function getRecentPostsSucceeded(posts: CommunityPost[]) {
  return {
    type: GET_RECENT_POSTS_SUCCEEDED,
    payload: {
      posts
    }
  };
}

export function getRecentPostsFailed(message: string) {
  return {
    type: GET_RECENT_POSTS_FAILED,
    payload: {
      message
    }
  };
}
export function getCommunityRequests() {
  return {
    type: GET_REQUESTS
  };
}

export function getCommunityRequestsSucceeded(
  requests: CommunityRequestCategory
) {
  return {
    type: GET_REQUESTS_SUCCEEDED,
    payload: {
      requests
    }
  };
}

export function getCommunityRequestsFailed(message: string) {
  return {
    type: GET_REQUESTS_FAILED,
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

export function resetPosts() {
  return {
    type: RESET_POSTS
  };
}
