import { compose } from 'redux';

import NewsArchivePagePure from './news-archive-page-pure';
import { newsArchivePageResolver } from './news-archive-page-resolver';

const enhance = compose(newsArchivePageResolver);

export const NewsArchivePage = enhance(NewsArchivePagePure);
