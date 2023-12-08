import React, { FC } from 'react';

import InformationPage, {
  Props as InformationPageProps
} from '../../../../../../pages/cms-information-page';
import SC from './styled';

interface Props extends InformationPageProps {}

const AboutHarvestingPage: FC<Props> = props => (
  <SC.AboutHarvestingPage>
    <InformationPage {...props} />
  </SC.AboutHarvestingPage>
);

export default AboutHarvestingPage;
