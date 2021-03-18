import React, { FC } from 'react';
import memoize from 'lodash/memoize';
import { resolve } from 'react-resolver';

import { getTranslateText } from '../../../lib/translateText';
import translations from '../../../lib/localization';

import { News as NewsInterface } from '../../../types';
import {
  extractNewsData,
  getNewsEntity
} from '../../../api/cms-api/news-entities';

const memoizedGetNewsEntity = memoize(getNewsEntity);

interface Props {
  newsItem?: Partial<NewsInterface>;
}

const PureNewsBreadcrumb: FC<Props> = ({ newsItem: { title } = {} }) => (
  <span>{getTranslateText(title ?? translations.breadcrumb.notFound)}</span>
);

const mapProps = {
  newsItem: ({ match: { params } }: any) =>
    memoizedGetNewsEntity(params.id)
      .then(extractNewsData)
      .catch(() => [])
};

export default resolve(mapProps)(PureNewsBreadcrumb);
