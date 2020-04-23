import memoize from 'lodash/memoize';
import { resolve } from 'react-resolver';
import {
  extractNewsData,
  getNewsEntity,
  getRecentNewsEntities
} from '../../api/cms-api/news-entities';

const NEWS_LIST_LIMIT = 3;

const memoizedGetNewsEntity = memoize(getNewsEntity);
const memoizedGetRecentNewsEntities = memoize(getRecentNewsEntities);

const mapProps = {
  newsItem: ({ match: { params } }: any) =>
    memoizedGetNewsEntity(params.id)
      .then(extractNewsData)
      .catch(() => []),
  news: () =>
    memoizedGetRecentNewsEntities(NEWS_LIST_LIMIT)
      .then(extractNewsData)
      .catch(() => [])
};

export const newsArticlePageResolver = resolve(mapProps);
