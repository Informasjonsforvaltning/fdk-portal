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

import SC from './styled';

interface Props extends CmsArticleProps, TranslationsProps {}

const articles = {
  [Language.NB]: 'ff7b4cde-7299-4212-98d7-13dd01a090a1',
  [Language.NN]: '20e549e1-f251-47ed-b712-1e320c613bf1',
  [Language.EN]: '679c4c6c-4a46-4033-86bd-2bd425e14af8'
};

const TermsOfUsePage: FC<Props> = ({
  cmsArticle,
  cmsArticleActions: { getCmsArticleRequested: getCmsArticle },
  translationsService
}) => {
  useEffect(() => {
    if (translationsService.getLanguage() in articles) {
      getCmsArticle(articles[translationsService.getLanguage()]);
    }
  }, []);

  const { created, changed, title, field_ingress, field_modules } =
    cmsArticle ?? {};

  return (
    <SC.TermsOfUsePage>
      <Article
        publishedDate={created}
        lastChangedDate={changed}
        title={title}
        abstract={field_ingress}
        field_modules={field_modules}
      />
    </SC.TermsOfUsePage>
  );
};

export default compose<FC>(
  memo,
  withTranslations,
  withCmsArticle
)(TermsOfUsePage);
