import React, { FC } from 'react';
import memoize from 'lodash/memoize';
import { resolve } from 'react-resolver';

import { getTranslateText } from '../../../lib/translateText';
import { News as NewsInterface } from '../../../types';
import {
  extractNewsData,
  getNewsEntity
} from '../../../api/cms-api/news-entities';

const memoizedGetNewsEntity = memoize(getNewsEntity);

interface Props {
  newsItem?: Partial<NewsInterface>;
}

export const PureNewsBreadcrumb: FC<Props> = ({ newsItem: { title } = {} }) => (
  <span>{getTranslateText(title)}</span>
);

const mapProps = {
  newsItem: ({ match: { params } }: any) =>
    memoizedGetNewsEntity(params.id)
      .then(extractNewsData)
      .catch(() => [])
};

export const NewsBreadcrumb = resolve(mapProps)(PureNewsBreadcrumb);
