import { compose } from 'redux';

import NewsArticlePure from './news-article-page-pure';
import { newsArticlePageResolver } from './news-article-page-resolver';
import ErrorPage from '../error-page';
import withErrorBoundary from '../../components/with-error-boundary';

const enhance = compose(newsArticlePageResolver, withErrorBoundary(ErrorPage));

export const NewsArticle = enhance(NewsArticlePure);
