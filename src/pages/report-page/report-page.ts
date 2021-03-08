import { compose } from 'redux';

import { ReportPagePure } from './report-page-pure';
import { reportPageConnector } from './report-page-connector';
import { reportPageResolver } from './report-page-resolver';
import withErrorBoundary from '../../components/with-error-boundary';
import ErrorPage from '../../components/error-page';

const enhance = compose(
  reportPageConnector,
  reportPageResolver,
  withErrorBoundary(ErrorPage)
);

export const ReportPage = enhance(ReportPagePure);
