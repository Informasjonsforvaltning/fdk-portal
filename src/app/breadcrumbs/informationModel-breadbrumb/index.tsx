import React, { memo, FC } from 'react';
import { compose } from 'redux';

import { getTranslateText as translate } from '../../../lib/translateText';

import withInformationModel, {
  Props as InformationModelProps
} from '../../../components/with-information-model';

interface Props extends InformationModelProps {}

const InformationModelBreadcrumb: FC<Props> = ({ informationModel }) => (
  <span>{translate(informationModel?.title)}</span>
);

export default compose<FC>(
  memo,
  withInformationModel
)(InformationModelBreadcrumb);
