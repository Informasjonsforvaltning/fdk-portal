import React, { FC, memo } from 'react';

import { News as NewsInterface } from '../../types';
import Article from '../../components/article/components/article/article.component';

interface Props {
  article?: Partial<NewsInterface>;
}

const CmsArticlePage: FC<Props> = ({
  article: { created, changed, title, field_ingress, field_modules } = {}
}) => (
  <Article
    publishedDate={created}
    lastChangedDate={changed}
    title={title}
    abstract={field_ingress}
    field_modules={field_modules}
  />
);

export default memo(CmsArticlePage);
