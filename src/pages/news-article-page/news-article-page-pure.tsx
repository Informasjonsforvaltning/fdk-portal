import React, { FC, memo } from 'react';

import SC from './styled';
import { News as NewsInterface } from '../../types';
import { getParagraphBodyValue } from '../../lib/drupal/drupal-values';
import Article from '../../components/article/components/article/article.component';

interface Props {
  newsItem?: Partial<NewsInterface>;
}

const NewsArticlePage: FC<Props> = ({
  newsItem: { title, field_ingress, field_modules } = {}
}) => (
  <main id="content" className="container">
    <SC.Content className="row">
      <div className="col-12 col-lg-8 offset-lg-2">
        <Article
          title={title}
          abstract={field_ingress}
          body={getParagraphBodyValue(field_modules)}
        />
      </div>
    </SC.Content>
  </main>
);

export default memo(NewsArticlePage);
