import memoize from 'lodash/memoize';
import { resolve } from 'react-resolver';
import {
  extractArticleData,
  getArticleEntity
} from '../../api/cms-api/article-entities';

const ARTICLE_GUIDANCE_ID = 'e32a0d53-d5f7-4b07-adc2-cc8cbac0fcdb';

const memoizedGetArticleEntity = memoize(getArticleEntity);

const mapProps = {
  article: () =>
    memoizedGetArticleEntity(ARTICLE_GUIDANCE_ID)
      .then(extractArticleData)
      .catch(() => [])
};

export const guidancePageResolver = resolve(mapProps);
