import React, { FC, memo, PropsWithChildren } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import SC from './styled';
import { News as NewsInterface } from '../../types';

import newsItems from '../main-page/news.json';
import Article from '../../components/article/components/article/article.component';

interface Props extends RouteComponentProps {}

const NewsArticlePage: FC<PropsWithChildren<Props>> = ({
  match: { params }
}: any) => {
  const newsItem: NewsInterface | undefined = newsItems.data.find(
    (item: any) => item.id === params.id
  );
  if (!newsItem) {
    return null;
  }
  return (
    <main id="content" className="container">
      <SC.Content className="row">
        <div className="col-12 col-lg-8 offset-lg-2">
          <Article article={newsItem?.attributes} />
        </div>
      </SC.Content>
    </main>
  );
};

export default memo(NewsArticlePage);
