import { compose } from 'redux';

import { ReportPagePure } from './report-page-pure';
import { reportPageConnector } from './report-page-connector';
import { reportPageResolver } from './report-page-resolver';

const enhance = compose(reportPageConnector, reportPageResolver);

export const ReportPage = enhance(ReportPagePure);
