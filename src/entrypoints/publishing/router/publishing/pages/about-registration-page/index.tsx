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
  nb: '1f8e5e49-c8a0-42bb-bab0-8948842d173f',
  nn: 'd0f5c946-10d6-4416-9ec9-00ad95127a9f',
  en: 'afb0ee91-dab4-44d7-857f-1652c3cac1b5'
};

const AboutRegistrationPage: FC<Props> = ({
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

export default compose<FC>(memo, withCmsArticle)(AboutRegistrationPage);
