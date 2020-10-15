import { resolve } from 'react-resolver';
import {
  extractArticleData,
  getArticleEntity
} from '../../api/cms-api/article-entities';
import localization from '../../lib/localization';
import {
  PATHNAME_ABOUT,
  PATHNAME_ABOUT_REGISTRATION,
  PATHNAME_GUIDANCE,
  PATHNAME_GUIDANCE_METADATA
} from '../../constants/constants';

const articleIds: { [pathname: string]: { [key: string]: string } } = {
  [PATHNAME_GUIDANCE]: {
    nb: 'e32a0d53-d5f7-4b07-adc2-cc8cbac0fcdb',
    nn: '40cb9799-4f53-482c-8075-417f70bcd483',
    en: '95430944-2177-48d1-9e1e-f589defd262c'
  },
  [PATHNAME_GUIDANCE_METADATA]: {
    nb: '701a4b80-d830-4aa5-be63-20422e3d8d64',
    nn: '5892cae9-2b31-4f52-b0a6-da87092924bf',
    en: 'cf2a2b6d-88bb-4f3a-bbfc-4114e2841479'
  },
  [PATHNAME_ABOUT_REGISTRATION]: {
    nb: '1f8e5e49-c8a0-42bb-bab0-8948842d173f',
    nn: 'd0f5c946-10d6-4416-9ec9-00ad95127a9f',
    en: 'afb0ee91-dab4-44d7-857f-1652c3cac1b5'
  },
  [PATHNAME_ABOUT]: {
    nb: 'd8443b67-85ae-45c9-af12-2f4851b0a012',
    nn: '9cc84334-e052-4572-910a-9c4fe815974b',
    en: '3e7b9b21-d7ce-470b-bdee-3b2db2d7448b'
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
