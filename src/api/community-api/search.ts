import axios from 'axios';
import type { CommunityPost, CommunityTopic } from '../../types';

import env from '../../env';
import { CommunityTerm } from '../../types/enums';

const { FDK_COMMUNITY_BASE_URI } = env;

export const searchCommunity = (queryTerm: string) =>
  axios
    .get(`${FDK_COMMUNITY_BASE_URI}/api/search?term=${queryTerm}`)
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
): CommunityTopic[] => [
  ...new Set(
    searchResponse.posts?.map(
      ({ topic }: CommunityPost) => topic
    ) as CommunityTopic[]
  )
];
