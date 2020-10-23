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
  [Language.NB]: '5e4d7251-1327-4cc1-8c91-2d0947fd75c4',
  [Language.NN]: 'ba6aac2b-57ad-4961-934f-1456f8d55da9',
  [Language.EN]: 'ae3b550d-7e75-4b47-b85c-18300aada1b4'
};

const AboutHarvestingPage: FC<Props> = ({
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
    <SC.AboutHarvestingPage>
      <Article
        publishedDate={created}
        lastChangedDate={changed}
        title={title}
        abstract={field_ingress}
        field_modules={field_modules}
      />
    </SC.AboutHarvestingPage>
  );
};

export default compose<FC>(
  memo,
  withTranslations,
  withCmsArticle
)(AboutHarvestingPage);
