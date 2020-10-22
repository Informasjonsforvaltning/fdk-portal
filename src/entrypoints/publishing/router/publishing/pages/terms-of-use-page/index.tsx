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
  nb: 'ff7b4cde-7299-4212-98d7-13dd01a090a1',
  nn: '20e549e1-f251-47ed-b712-1e320c613bf1',
  en: '679c4c6c-4a46-4033-86bd-2bd425e14af8'
};

const TermsOfUsePage: FC<Props> = ({
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

export default compose<FC>(memo, withCmsArticle)(TermsOfUsePage);
