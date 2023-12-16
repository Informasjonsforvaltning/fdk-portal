import React, { FC } from 'react';

import InformationPage, {
  Props as InformationPageProps
} from '../../../../../../pages/cms-information-page';
import SC from './styled';

interface Props extends InformationPageProps {}

const TermsOfUsePage: FC<Props> = props => (
  <SC.TermsOfUsePage>
    <InformationPage {...props} />
  </SC.TermsOfUsePage>
);

export default TermsOfUsePage;
