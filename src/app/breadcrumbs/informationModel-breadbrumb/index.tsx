import React, { memo, FC } from 'react';
import { compose } from 'redux';

import { Link } from 'react-router-dom';
import ChevronUpIcon from '@fellesdatakatalog/icons/assets/svg/chevron-up-stroke.svg';
import { getTranslateText as translate } from '../../../lib/translateText';
import localization from '../../../lib/localization';

import withInformationModel, {
  Props as InformationModelProps
} from '../../../components/with-information-model';

interface Props extends InformationModelProps {}

const InformationModelBreadcrumb: FC<Props> = ({ informationModel }) => (
  <>
    <Link to='/information-models'>
      {localization.page.informationModelTab}
    </Link>
    <ChevronUpIcon className='fdk-path-chevron' />
    <span>
      {translate(informationModel?.title ?? localization.breadcrumb.notFound)}
    </span>
  </>
);

export default compose<FC>(
  memo,
  withInformationModel
)(InformationModelBreadcrumb);
