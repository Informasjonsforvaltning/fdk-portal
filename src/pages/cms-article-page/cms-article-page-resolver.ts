import { resolve } from 'react-resolver';
import {
  extractArticleData,
  getArticleEntity
} from '../../api/cms-api/article-entities';
import localization from '../../lib/localization';
import { PATHNAME_GUIDANCE } from '../../constants/constants';

const articleIds: { [pathname: string]: { [key: string]: string } } = {
  [PATHNAME_GUIDANCE]: {
    nb: 'e32a0d53-d5f7-4b07-adc2-cc8cbac0fcdb',
    nn: '40cb9799-4f53-482c-8075-417f70bcd483',
    en: '95430944-2177-48d1-9e1e-f589defd262c'
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
