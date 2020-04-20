import { compose } from 'redux';

import NewsArticlePure from './news-article-page-pure';
import { newsArticlePageResolver } from './news-article-page-resolver';

const enhance = compose(newsArticlePageResolver);

export const NewsArticle = enhance(NewsArticlePure);
