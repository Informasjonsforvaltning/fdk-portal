import { compose } from 'redux';

import NewsArchivePagePure from './news-archive-page-pure';
import { newsArchivePageResolver } from './news-archive-page-resolver';

import ErrorPage from '../error-page';
import withErrorBoundary from '../../components/with-error-boundary';

const enhance = compose(newsArchivePageResolver, withErrorBoundary(ErrorPage));

export const NewsArchivePage = enhance(NewsArchivePagePure);
