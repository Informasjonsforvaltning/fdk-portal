import { resolve } from 'react-resolver';
import {
  extractArticleData,
  getArticleEntity
} from '../../api/cms-api/article-entities';
import localization from '../../lib/localization';
import {
  PATHNAME_ABOUT_REGISTRATION,
  PATHNAME_GUIDANCE
} from '../../constants/constants';

const articleIds: { [pathname: string]: { [key: string]: string } } = {
  [PATHNAME_GUIDANCE]: {
    nb: 'e32a0d53-d5f7-4b07-adc2-cc8cbac0fcdb',
    nn: '40cb9799-4f53-482c-8075-417f70bcd483',
    en: '95430944-2177-48d1-9e1e-f589defd262c'
  },
  [PATHNAME_ABOUT_REGISTRATION]: {
    nb: '1f8e5e49-c8a0-42bb-bab0-8948842d173f',
    nn: 'd0f5c946-10d6-4416-9ec9-00ad95127a9f',
    en: 'afb0ee91-dab4-44d7-857f-1652c3cac1b5'
  }
};

const mapProps = {
  article: ({ location }: any) => {
    const ARTICLE_FETCH_ID =
      articleIds[location.pathname]?.[localization.getLanguage()];

    return getArticleEntity(ARTICLE_FETCH_ID)
      .then(extractArticleData)
      .catch(() => []);
  }
};

export const cmsArticlePageResolver = resolve(mapProps);
