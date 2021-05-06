import React, { memo, FC, useEffect } from 'react';
import { compose } from 'redux';

import {
  withTranslations,
  Props as TranslationsProps,
  Language
} from '../../../../../../providers/translations';

import withCmsArticle, {
  Props as CmsArticleProps
} from '../../../../../../components/with-cms-article';

import { Article } from '../../../../../../components/article/article';

import { getConfig } from '../../../../../../config';

import SC from './styled';

interface Props extends CmsArticleProps, TranslationsProps {}

const demoArticles = {
  [Language.NB]: '4ce5c558-d98e-48b7-bc01-9997b8d1ad80',
  [Language.NN]: '612007c4-9e66-4161-be5e-e1af60051e83',
  [Language.EN]: '1b1e13b2-fb7b-4cea-9c2b-fd38b264bef2'
};

const articles = {
  [Language.NB]: '1f8e5e49-c8a0-42bb-bab0-8948842d173f',
  [Language.NN]: 'd0f5c946-10d6-4416-9ec9-00ad95127a9f',
  [Language.EN]: 'afb0ee91-dab4-44d7-857f-1652c3cac1b5'
};

const AboutRegistrationPage: FC<Props> = ({
  cmsArticle,
  cmsArticleActions: { getCmsArticleRequested: getCmsArticle },
  translationsService
}) => {
  useEffect(() => {
    if (getConfig().useDemoLogo) {
      if (translationsService.getLanguage() in demoArticles) {
        getCmsArticle(demoArticles[translationsService.getLanguage()]);
      }
    } else if (translationsService.getLanguage() in articles) {
      getCmsArticle(articles[translationsService.getLanguage()]);
    }
  }, []);

  const { created, changed, title, field_ingress, field_modules } =
    cmsArticle ?? {};

  return (
    <SC.AboutRegistrationPage>
      <Article
        publishedDate={created}
        lastChangedDate={changed}
        title={title}
        abstract={field_ingress}
        field_modules={field_modules}
      />
    </SC.AboutRegistrationPage>
  );
};

export default compose<FC>(
  memo,
  withTranslations,
  withCmsArticle
)(AboutRegistrationPage);
