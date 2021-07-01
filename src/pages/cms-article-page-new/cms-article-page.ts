import { compose } from 'redux';

import CmsArticlePagePure from './cms-article-page-pure';
import ErrorPage from '../../components/error-page';
import withErrorBoundary from '../../components/with-error-boundary';

const enhance = compose(withErrorBoundary(ErrorPage));

export const CmsArticlePage = enhance(CmsArticlePagePure);
