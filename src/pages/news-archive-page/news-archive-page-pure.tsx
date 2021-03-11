import React, { FC, memo } from 'react';

import SC from './styled';
import { News } from '../../types';
import { findParagraphImage } from '../../lib/drupal/drupal-values';
import ArticleItem from '../../components/article-item/article-item.component';
import localization from '../../lib/localization';

interface Props {
  news?: any;
}

const renderNewsItems = (news: News[]) =>
  news?.map((item: News) => {
    const image = findParagraphImage(item.field_modules);
    return (
      <ArticleItem
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

const NewsArchivePage: FC<Props> = ({ news }) => {
  return (
    <main className='container'>
      <div className='row'>
        <SC.Header className='col-12'>{localization.news}</SC.Header>
      </div>
      <div className='row'>
        <SC.Content className='col-12'>{renderNewsItems(news)}</SC.Content>
      </div>
    </main>
  );
};

export default memo(NewsArchivePage);
