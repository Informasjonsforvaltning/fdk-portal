import { compose } from 'redux';

import GuidancePagePure from './guidance-page-pure';
import { guidancePageResolver } from './guidance-page-resolver';

const enhance = compose(guidancePageResolver);

export const GuidancePage = enhance(GuidancePagePure);
