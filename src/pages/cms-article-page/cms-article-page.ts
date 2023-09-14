import { compose } from 'redux';

import CmsArticlePagePure from './cms-article-page-pure';
import { cmsArticlePageResolver } from './cms-article-page-resolver';
import ErrorPage from '../error-page';
import withErrorBoundary from '../../components/with-error-boundary';

const enhance = compose(cmsArticlePageResolver, withErrorBoundary(ErrorPage));

export const CmsArticlePage = enhance(CmsArticlePagePure);
