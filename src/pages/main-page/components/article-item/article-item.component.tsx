import React, { FC, memo } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import SC from './styled';

interface Props {
  id: string;
  date?: string;
  title?: string;
  abstract?: string;
}

const ArticleItem: FC<Props> = ({ id, date, title, abstract }) => (
  <SC.ArticleItem>
    <header>
      {date && (
        <SC.Date>
          <Moment format="DD.MM.YYYY">{date}</Moment>
        </SC.Date>
      )}
      {title && (
        <SC.Title>
          <Link to={`news/${id}`}>{title}</Link>
        </SC.Title>
      )}
    </header>
    {abstract && <SC.Abstract>{abstract}</SC.Abstract>}
  </SC.ArticleItem>
);

export default memo(ArticleItem);
