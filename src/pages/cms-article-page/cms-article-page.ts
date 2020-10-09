import { compose } from 'redux';

import CmsArticlePagePure from './cms-article-page-pure';
import { cmsArticlePageResolver } from './cms-article-page-resolver';

const enhance = compose(cmsArticlePageResolver);

export const CmsArticlePage = enhance(CmsArticlePagePure);
