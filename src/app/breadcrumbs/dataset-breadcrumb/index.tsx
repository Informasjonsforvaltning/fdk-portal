import React, { memo, FC } from 'react';
import { compose } from 'redux';

import { Link } from 'react-router-dom';
import ChevronUpIcon from '@fellesdatakatalog/icons/assets/svg/chevron-up-stroke.svg';
import { getTranslateText as translate } from '../../../lib/translateText';
import translations from '../../../lib/localization';

import withDataset, {
  Props as DatasetProps
} from '../../../components/with-dataset';
import localization from '../../../lib/localization';

interface Props extends DatasetProps {}

const DatasetBreadcrumb: FC<Props> = ({ dataset }) => (
  <>
    <Link to='/datasets'>{localization.page.datasetTab}</Link>
    <ChevronUpIcon className='fdk-path-chevron' />
    <span>{translate(dataset?.title ?? translations.breadcrumb.notFound)}</span>
  </>
);

export default compose<FC>(memo, withDataset)(DatasetBreadcrumb);
