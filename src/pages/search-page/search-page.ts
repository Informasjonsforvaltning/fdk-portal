import { compose } from 'redux';

import SearchPagePure from './search-page-pure';
import { searchPageConnector } from './search-page-connector';
import { searchPageResolver } from './search-page-resolver';

import withErrorBoundary from '../../components/with-error-boundary';
import ErrorPage from '../error-page';

const enhance = compose(
  searchPageResolver,
  searchPageConnector,
  withErrorBoundary(ErrorPage)
);

export const SearchPage = enhance(SearchPagePure);
