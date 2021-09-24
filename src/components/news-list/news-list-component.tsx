import React, { FC, memo } from 'react';
import { Link as RouteLink } from 'react-router-dom';

import SC from './styled';
import localization from '../../lib/localization';
import { News } from '../../types';
import Item from '../article-item/article-item.component';
import { findParagraphImage } from '../../lib/drupal/drupal-values';
import { PATHNAME_NEWS_ARCHIVE } from '../../constants/constants';

interface Props {
  news?: News[];
}

const renderNewsItems = (news: News[]) =>
  news?.map((item: News) => {
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
        showFallbackImage={false}
      />
    );
  });

const NewsList: FC<Props> = ({ news }) => {
  if (news && news.length > 0) {
    return (
      <SC.NewsList>
        {renderNewsItems(news)}
        <SC.Link as={RouteLink} to={PATHNAME_NEWS_ARCHIVE}>
          {localization.newsArchive}
        </SC.Link>
      </SC.NewsList>
    );
  }
  return null;
};

export default memo(NewsList);
