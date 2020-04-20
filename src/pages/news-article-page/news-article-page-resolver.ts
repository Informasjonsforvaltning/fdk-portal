import memoize from 'lodash/memoize';
import { resolve } from 'react-resolver';
import {
  extractNewsData,
  getNewsEntity
} from '../../api/cms-api/news-entities';

const memoizedGetNewsEntity = memoize(getNewsEntity);

const mapProps = {
  newsItem: ({ match: { params } }: any) =>
    memoizedGetNewsEntity(params.id)
      .then(extractNewsData)
      .catch(() => [])
};

export const newsArticlePageResolver = resolve(mapProps);
