import React, { memo, FC } from 'react';
import { compose } from 'redux';

import { Link } from 'react-router-dom';
import ChevronUpIcon from '@fellesdatakatalog/icons/assets/svg/chevron-up-stroke.svg';
import { getTranslateText as translate } from '../../../lib/translateText';
import localization from '../../../lib/localization';

import withDataset, {
  Props as DatasetProps
} from '../../../components/with-dataset';

interface Props extends DatasetProps {}

const DatasetBreadcrumb: FC<Props> = ({ dataset }) => (
  <>
    <Link to='/datasets'>{localization.page.datasetTab}</Link>
    <ChevronUpIcon className='fdk-path-chevron' />
    <span>{translate(dataset?.title ?? localization.breadcrumb.notFound)}</span>
  </>
);

export default compose<FC>(memo, withDataset)(DatasetBreadcrumb);
