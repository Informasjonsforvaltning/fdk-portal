import React, { FC, memo } from 'react';
import Moment from 'react-moment';

import SC from './styled';

interface Props {
  date?: string;
  title?: string;
  abstract?: string;
}

const ArticleItem: FC<Props> = ({ date, title, abstract }) => (
  <SC.ArticleItem>
    <header>
      {date && (
        <SC.Date>
          <Moment format="DD.MM.YYYY">{date}</Moment>
        </SC.Date>
      )}
      {title && <SC.Title>{title}</SC.Title>}
    </header>
    {abstract && <SC.Abstract>{abstract}</SC.Abstract>}
  </SC.ArticleItem>
);

export default memo(ArticleItem);
