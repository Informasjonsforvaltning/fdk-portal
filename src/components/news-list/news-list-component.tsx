import React, { FC, memo } from 'react';

import { News } from '../../types';
import Item from '../article-item/article-item.component';

interface Props {
  news?: News[];
}

const NewsList: FC<Props> = ({ news }) => {
  if (news && news.length > 0) {
    return (
      <div>
        {news.map((item: News) => (
          <Item
            key={item.id}
            id={item.id}
            date={item.created}
            title={item.title}
            abstract={item.field_ingress}
          />
        ))}
      </div>
    );
  }
  return null;
};

export default memo(NewsList);
