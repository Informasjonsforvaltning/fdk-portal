import React, { memo, FC } from 'react';
import { compose } from 'redux';

import { getTranslateText as translate } from '../../../lib/translateText';
import translations from '../../../lib/localization';

import withDataService, {
  Props as DataServiceProps
} from '../../../components/with-data-service';

interface Props extends DataServiceProps {}

const DataServiceBreadcrumb: FC<Props> = ({ dataService }) => (
  <span>
    {translate(dataService?.title ?? translations.breadcrumb.notFound)}
  </span>
);

export default compose<FC>(memo, withDataService)(DataServiceBreadcrumb);
