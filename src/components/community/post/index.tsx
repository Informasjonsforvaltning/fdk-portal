import React, { FC } from 'react';
import parse from 'html-react-parser';
import env from '../../../env';
import User from '../user';
import SC from './styled';
import type { CommunityPost } from '../../../types';
import TimeStamp from '../time-stamp';
import TruncatedText from '../../truncated-text';

const { FDK_COMMUNITY_BASE_URI } = env;

interface Props {
  post: CommunityPost;
}

const PostLink: FC<Props> = ({ post }) => (
  <SC.PostLink
    href={`${FDK_COMMUNITY_BASE_URI}/topic/${post.topic.slug}/${post.pid}`}
  >
    <h5>{post.topic.titleRaw}</h5>
    <SC.UserInfo>
      <User user={post.user} />
    </SC.UserInfo>
    <TruncatedText visibleLines={4} lineHeight={24} onlyTruncate isTruncated>
      {parse(post.content)}
    </TruncatedText>
    <TimeStamp time={post.timestamp} />
  </SC.PostLink>
);

export default PostLink;
