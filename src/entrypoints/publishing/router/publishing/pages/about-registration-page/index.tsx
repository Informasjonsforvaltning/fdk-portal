import React, { FC } from 'react';

import InformationPage, {
  Props as InformationPageProps
} from '../../../../../../pages/cms-information-page';
import SC from './styled';

interface Props extends InformationPageProps {}

const AboutRegistrationPage: FC<Props> = props => (
  <SC.AboutRegistrationPage>
    <InformationPage {...props} />
  </SC.AboutRegistrationPage>
);

export default AboutRegistrationPage;
