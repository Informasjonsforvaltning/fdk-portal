import axios from 'axios';
import type { CommunityPost, CommunityTopic } from '../../types';

import env from '../../env';

const { FDK_COMMUNITY_BASE_URI } = env;

export const searchCommunity = (queryTerm: string) =>
  axios
    .get(`${FDK_COMMUNITY_BASE_URI}/api/search?term=${queryTerm}`)
    .then(response => response.data);

export const getTopicById = (tid: number) =>
  axios
    .get(`${FDK_COMMUNITY_BASE_URI}/api/topic/${tid}`)
    .then(response => response.data);

export const extractTopicsFromSearch = (
  searchResponse: any
): CommunityTopic[] => [
  ...new Set(
    searchResponse.posts?.map(
      (post: CommunityPost) => post?.topic
    ) as CommunityTopic[]
  )
];
