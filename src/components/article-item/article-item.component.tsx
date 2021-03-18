import React, { FC, memo } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import SC from './styled';
import { PATHNAME_NEWS_ARTICLE } from '../../constants/constants';

interface Image {
  alt: string;
  url: string;
}
interface Props {
  id: string;
  date?: string;
  title?: string;
  abstract?: string;
  image?: Image;
  showFallbackImage?: boolean;
}

const ArticleItem: FC<Props> = ({
  id,
  date,
  title,
  abstract,
  image: { alt: imageAlt, url: imageUrl } = {},
  showFallbackImage = true
}) => (
  <SC.ArticleItem>
    <Link to={`${PATHNAME_NEWS_ARTICLE}/${id}`}>
      {(showFallbackImage || imageUrl) && (
        <SC.Image title={imageAlt} imageUrl={imageUrl} />
      )}
      <header>
        {date && (
          <SC.Date>
            <Moment format='DD.MM.YYYY'>{date}</Moment>
          </SC.Date>
        )}
        {title && <SC.Title>{title}</SC.Title>}
      </header>
      {abstract && <SC.Abstract>{abstract}</SC.Abstract>}
    </Link>
  </SC.ArticleItem>
);

export default memo(ArticleItem);
