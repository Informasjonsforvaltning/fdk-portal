import memoize from 'lodash/memoize';
import { resolve } from 'react-resolver';
import {
  extractNewsData,
  getRecentNewsEntities
} from '../../api/cms-api/news-entities';

const NEWS_PAGE_LIMIT = 20;

const memoizedGetRecentNewsEntities = memoize(getRecentNewsEntities);

const mapProps = {
  news: () =>
    memoizedGetRecentNewsEntities(NEWS_PAGE_LIMIT)
      .then(extractNewsData)
      .catch(() => [])
};

export const newsArchivePageResolver = resolve(mapProps);
