import { compose } from 'recompose';

import SearchPagePure from './search-page-pure';
import { searchPageConnector } from './search-page-connector';

const enhance = compose(searchPageConnector);

export const SearchPage = enhance(SearchPagePure);
