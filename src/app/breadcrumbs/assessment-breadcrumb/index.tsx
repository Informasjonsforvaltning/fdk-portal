import React, { memo, FC } from 'react';
import { compose } from 'redux';

import { getTranslateText as translate } from '../../../lib/translateText';
import translations from '../../../lib/localization';

import withAssessment, {
  Props as AssessmentProps
} from '../../../components/with-assessment';

interface Props extends AssessmentProps {}

const AssessmentBreadcrumb: FC<Props> = ({ assessment }) => (
  <>
    {translate(assessment?.entity?.title) ?? translations.breadcrumb.notFound}
  </>
);

export default compose<FC>(memo, withAssessment)(AssessmentBreadcrumb);
