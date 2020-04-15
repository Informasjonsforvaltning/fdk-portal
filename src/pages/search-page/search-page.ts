import { compose } from 'redux';

import SearchPagePure from './search-page-pure';
import { searchPageConnector } from './search-page-connector';
import { searchPageResolver } from './search-page-resolver';

const enhance = compose(searchPageResolver, searchPageConnector);

export const SearchPage = enhance(SearchPagePure);
