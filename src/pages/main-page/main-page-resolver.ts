import memoize from 'lodash/memoize';
import { resolve } from 'react-resolver';
import {
  extractNewsData,
  getRecentNewsEntities
} from '../../api/cms-api/news-entities';

const memoizedGetRecentNewsEntities = memoize(getRecentNewsEntities);

const mapProps = {
  news: () =>
    memoizedGetRecentNewsEntities()
      .then(extractNewsData)
      .catch(() => [])
};

export const mainPageResolver = resolve(mapProps);
