import axios from 'axios';
import type { CommunityPost, CommunityTopic } from '../../types';

import env from '../../env';
import { CommunityTerm } from '../../types/enums';
import translations from '../../lib/localization';

const { FDK_COMMUNITY_BASE_URI } = env;

export const searchCommunity = (queryTerm: string) =>
  axios
    .get(
      `${FDK_COMMUNITY_BASE_URI}/api/search?term=${queryTerm}&sortBy=topic.lastposttime&sortDirection=desc`
    )
    .then(({ data }) => data);

export const getTopicById = (tid: number) =>
  axios
    .get(`${FDK_COMMUNITY_BASE_URI}/api/topic/${tid}`)
    .then(({ data }) => data);

export const getRecentPosts = (term: CommunityTerm) =>
  axios
    .get(`${FDK_COMMUNITY_BASE_URI}/api/recent/posts/${term}`)
    .then(({ data }) => data);

export const extractTopicsFromSearch = (
  searchResponse: any
): CommunityTopic[] => {
  const postIds = new Set();
  const uniqueTopics: CommunityTopic[] = [];

  searchResponse.posts.forEach(({ topic }: CommunityPost) => {
    if (!postIds.has(topic.tid)) {
      uniqueTopics.push(topic);
      postIds.add(topic.tid);
    }
  });

  return uniqueTopics;
};

export const searchCommunityRequests = (
  queryTerm: string,
  sortOption?: string
) => {
  if (queryTerm.length > 0) {
    return axios
      .get(
        `${FDK_COMMUNITY_BASE_URI}/api/search?term=${queryTerm}&in=titles&matchWords=all&categories[]=6&sortBy=${sortOption}&sortDirection=desc`
      )
      .then(({ data }) => data);
  }
  return axios
    .get(
      `${FDK_COMMUNITY_BASE_URI}/api/search?&categories[]=6&sortBy=${sortOption}&sortDirection=desc`
    )
    .then(({ data }) => data);
};

export const pruneNodebbTemplateTags = (raw_text: string) =>
  raw_text.replace(
    /(?:\|\s)(?:\[{2})(.*?)(?:\]{2}:)(.*?)(?:\s\|)/g,
    (_substring, tagCapture, valueCapture) => {
      if (tagCapture === 'calendar:event_title') {
        return `${translations.community.meetingTitle}${valueCapture}`;
      }
      return valueCapture;
    }
  );
