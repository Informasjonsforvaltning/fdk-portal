import React, { FC, memo } from 'react';

import { News as NewsInterface } from '../../types';
import Article from '../../components/article/components/article/article.component';

interface Props {
  newsItem?: Partial<NewsInterface>;
  news?: any;
}

const NewsArticlePage: FC<Props> = ({
  newsItem: { created, changed, title, field_ingress, field_modules } = {},
  news
}) => (
  <Article
    publishedDate={created}
    lastChangedDate={changed}
    title={title}
    abstract={field_ingress}
    field_modules={field_modules}
    relatedNews={news}
  />
);

export default memo(NewsArticlePage);
