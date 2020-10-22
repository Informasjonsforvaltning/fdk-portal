import React, { memo, FC, useEffect } from 'react';
import { compose } from 'redux';

import localization from '../../../../../../lib/localization';

import withCmsArticle, {
  Props as CmsArticleProps
} from '../../../../../../components/with-cms-article';

import { Article } from '../../../../../../components/article/article';

import SC from './styled';

interface Props extends CmsArticleProps {}

const articles: { [key: string]: string } = {
  nb: '5e4d7251-1327-4cc1-8c91-2d0947fd75c4',
  nn: 'ba6aac2b-57ad-4961-934f-1456f8d55da9',
  en: 'ae3b550d-7e75-4b47-b85c-18300aada1b4'
};

const AboutHarvestingPage: FC<Props> = ({
  cmsArticle,
  cmsArticleActions: { getCmsArticleRequested: getCmsArticle }
}) => {
  useEffect(() => {
    if (localization.getLanguage() in articles) {
      getCmsArticle(articles[localization.getLanguage()]);
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

export default compose<FC>(memo, withCmsArticle)(AboutHarvestingPage);
