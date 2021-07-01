import React, { FC, memo } from 'react';

import Article from '../../components/article/components/article/article.component';
import { useGetArticleQuery } from '../../api/generated/graphql';

const CmsArticlePage: FC = () => {
  const id = '1'; // TODO: Actually implemenent.
  const { data, loading } = useGetArticleQuery({ variables: { id } });
  /**
   * useGetArticleQuery also exports `error`
   */

  if (loading) {
    return <div>Laster</div>;
  }

  if (!data || !data.article) {
    return <div>404</div>;
  }

  const {
    article: { title, published_at }
  } = data;

  return (
    <Article
      publishedDate={published_at}
      lastChangedDate=''
      title={title}
      abstract=''
      field_modules=''
    />
  );
};

export default memo(CmsArticlePage);
