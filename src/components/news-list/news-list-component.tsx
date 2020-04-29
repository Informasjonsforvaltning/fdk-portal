import React, { FC, memo } from 'react';

import SC from './styled';
import { News } from '../../types';
import Item from '../article-item/article-item.component';
import { findParagraphImage } from '../../lib/drupal/drupal-values';

interface Props {
  news?: News[];
}

const renderNewsItems = (news: News[]) => {
  return news?.map((item: News) => {
    const image = findParagraphImage(item.field_modules);
    return (
      <Item
        key={item.id}
        id={item.id}
        date={item.created}
        title={item.title}
        abstract={item.field_ingress}
        image={{
          alt: image?.meta?.alt,
          url: image?.download_urls?.canonical
        }}
      />
    );
  });
};

const NewsList: FC<Props> = ({ news }) => {
  if (news && news.length > 0) {
    return <SC.NewsList>{renderNewsItems(news)}</SC.NewsList>;
  }
  return null;
};

export default memo(NewsList);
