import React, { FC } from 'react';
import parse from 'html-react-parser';

import env from '../../../env';

import translations from '../../../lib/localization';

import TimeAgo from '../time-ago';
import User from '../user';
import TruncatedText from '../../truncated-text';

import SC from './styled';

import type { CommunityPost } from '../../../types';

const { FDK_COMMUNITY_BASE_URI } = env;

interface Props {
  post: CommunityPost;
}

const PostLink: FC<Props> = ({ post }) => (
  <SC.PostLink
    href={`${FDK_COMMUNITY_BASE_URI}topic/${post.topic.slug}/${post.pid}`}
  >
    <h3>{post.topic.title}</h3>
    <SC.Content>
      <SC.UserInfo>
        <User user={post.user} />
        <span>
          {translations.community.timeago.postPrefix}
          <TimeAgo startTime={post.timestamp} lowercase />:
        </span>
      </SC.UserInfo>
      <TruncatedText visibleLines={5} lineHeight={14} onlyTruncate>
        {parse(post.content)}
      </TruncatedText>
    </SC.Content>
  </SC.PostLink>
);

export default PostLink;
