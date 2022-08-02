import React, { FC, useState } from 'react';
import { theme, Colour } from '@fellesdatakatalog/theme';
import SC from './styled';
import TimeStamp from '../time-stamp';
import TruncatedText from '../../truncated-text';
import { PATHNAME_NEWS_ARTICLE } from '../../../constants/constants';

interface Props {
  created: string;
  field_ingress: string;
  title: string;
  id?: string;
  customColor?: string;
  customHoverColor?: string;
}

const PostLink: FC<Props> = ({
  created,
  field_ingress,
  title,
  id,
  customColor = (() =>
    theme.colour(Colour.NEUTRAL, 'N10')) as unknown as string,
  customHoverColor = (() =>
    theme.colour(Colour.NEUTRAL, 'N15')) as unknown as string
}) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <SC.PostLink
      href={`${PATHNAME_NEWS_ARTICLE}/${id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h5>{title}</h5>
      <TruncatedText
        visibleLines={4}
        lineHeight={24}
        customColor={isHovered ? customHoverColor : customColor}
        onlyTruncate
        isTruncated
      >
        {field_ingress}
      </TruncatedText>
      <TimeStamp time={Date.parse(created)} />
    </SC.PostLink>
  );
};

export default PostLink;
