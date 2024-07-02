import {
  SEARCH_TOPICS_REQUESTED,
  SEARCH_TOPICS_SUCCEEDED,
  SEARCH_TOPICS_FAILED,
  GET_RECENT_POSTS_REQUESTED,
  GET_RECENT_POSTS_SUCCEEDED,
  GET_RECENT_POSTS_FAILED,
  RESET_TOPICS,
  RESET_POSTS,
  SEARCH_REQUESTS_REQUESTED,
  SEARCH_REQUESTS_SUCCEEDED,
  SEARCH_REQUESTS_FAILED,
  GET_REQUEST_CATEGORY_REQUESTED,
  GET_REQUEST_CATEGORY_SUCCEEDED,
  GET_REQUEST_CATEGORY_FAILED
} from './action-types';

import type {
  CommunityCategory,
  CommunityRequestPost,
  CommunityPost,
  CommunityTopic,
  Pagination
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

export function searchRequestsRequested(
  queryTerm: string | undefined,
  page: string | undefined,
  sortOption: string | undefined
) {
  return {
    type: SEARCH_REQUESTS_REQUESTED,
    payload: {
      queryTerm,
      page,
      sortOption
    }
  };
}

export function searchRequestsSucceeded(
  requests: CommunityRequestPost[],
  pagination: Pagination
) {
  return {
    type: SEARCH_REQUESTS_SUCCEEDED,
    payload: {
      requests,
      pagination
    }
  };
}

export function searchRequestsFailed(message: string) {
  return {
    type: SEARCH_REQUESTS_FAILED,
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

export function getRequestCategoryRequested() {
  return {
    type: GET_REQUEST_CATEGORY_REQUESTED
  };
}

export function getRequestCategorySucceeded(
  requestCategory: CommunityCategory
) {
  return {
    type: GET_REQUEST_CATEGORY_SUCCEEDED,
    payload: {
      requestCategory
    }
  };
}

export function getRequestCategoryFailed(message: string) {
  return {
    type: GET_REQUEST_CATEGORY_FAILED,
    payload: {
      message
    }
  };
}
