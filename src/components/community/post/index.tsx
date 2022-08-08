import React, { FC, useState } from 'react';
import parse from 'html-react-parser';
import { Colour, theme } from '@fellesdatakatalog/theme';
import env from '../../../env';
import User from '../user';
import SC from './styled';
import type { CommunityPost } from '../../../types';
import TimeStamp from '../time-stamp';
import TruncatedText from '../../truncated-text';

const { FDK_COMMUNITY_BASE_URI } = env;

interface Props {
  post: CommunityPost;
  customColor?: string;
  customHoverColor?: string;
}

const PostLink: FC<Props> = ({
  post,
  customColor = (() =>
    theme.colour(Colour.NEUTRAL, 'N10')) as unknown as string,
  customHoverColor = (() =>
    theme.colour(Colour.NEUTRAL, 'N15')) as unknown as string
}) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <SC.PostLink
      href={`${FDK_COMMUNITY_BASE_URI}/topic/${post.topic.slug}/${post.pid}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h5>{post.topic.titleRaw}</h5>
      <SC.UserInfo>
        <User user={post.user} />
      </SC.UserInfo>
      <TruncatedText
        visibleLines={4}
        lineHeight={24}
        customColor={isHovered ? customHoverColor : customColor}
        onlyTruncate
        isTruncated
      >
        {parse(post.content)}
      </TruncatedText>
      <TimeStamp time={post.timestamp} />
    </SC.PostLink>
  );
};

export default PostLink;
