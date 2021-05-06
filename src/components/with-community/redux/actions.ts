import {
  SEARCH_TOPICS_REQUESTED,
  SEARCH_TOPICS_SUCCEEDED,
  SEARCH_TOPICS_FAILED,
  GET_RECENT_POSTS_REQUESTED,
  GET_RECENT_POSTS_SUCCEEDED,
  GET_RECENT_POSTS_FAILED,
  RESET_TOPICS,
  RESET_POSTS
} from './action-types';

import type { CommunityPost, CommunityTopic } from '../../../types';
import { CommunityTerm } from '../../../types/enums';

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
