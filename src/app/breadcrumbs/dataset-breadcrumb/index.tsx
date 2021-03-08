import React, { memo, FC } from 'react';
import { compose } from 'redux';

import { getTranslateText as translate } from '../../../lib/translateText';
import translations from '../../../lib/localization';

import withDataset, {
  Props as DatasetProps
} from '../../../components/with-dataset';

interface Props extends DatasetProps {}

const DatasetBreadcrumb: FC<Props> = ({ dataset }) => (
  <span>{translate(dataset?.title ?? translations.breadcrumb.notFound)}</span>
);

export default compose<FC>(memo, withDataset)(DatasetBreadcrumb);
