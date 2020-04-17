import React, { FC, memo } from 'react';

import SC from './styled';
import { News as NewsInterface } from '../../types';

import Article from '../../components/article/components/article/article.component';

interface Props {
  newsItem?: Partial<NewsInterface>;
}

const NewsArticlePage: FC<Props> = ({ newsItem }) => (
  <main id="content" className="container">
    <SC.Content className="row">
      <div className="col-12 col-lg-8 offset-lg-2">
        {newsItem && <Article article={newsItem} />}
      </div>
    </SC.Content>
  </main>
);

export default memo(NewsArticlePage);
