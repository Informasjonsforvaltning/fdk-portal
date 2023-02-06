import React, { FC } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import Link from '@fellesdatakatalog/link';

import {
  PATHNAME_ABOUT_REGISTRATION,
  PATHNAME_DATASETS
} from '../../constants/constants';
import translations from '../../lib/localization';

import EmailIcon from '../../images/email.svg';

import TransportPortalLogos from '../transport-portal-logos';

import SC from './styled';

interface Props {}

const TransportPortalFooter: FC<Props> = () => (
  <SC.TransportPortalFooter>
    <SC.Wrapper>
      <TransportPortalLogos />
      <SC.Content>
        <SC.Column>
          <span>{translations.footer.information_textNap}</span>
          <Link href='mailto:transportportal@vegvesen.no' icon={<EmailIcon />}>
            transportportal@vegvesen.no
          </Link>
        </SC.Column>
        <SC.Column>
          <Link to={PATHNAME_DATASETS} as={RouteLink}>
            {translations.footer.searchDatasets}
          </Link>
          <Link href='https://transportportal.atlas.vegvesen.no/no/gen/about/'>
            {translations.menu.aboutNap}
          </Link>
          <Link to={PATHNAME_ABOUT_REGISTRATION} as={RouteLink}>
            {translations.footer.guideToRegister}
          </Link>
        </SC.Column>
        <SC.Column>
          <Link href='https://www.digdir.no/om-oss/personvernerklaering/706'>
            {translations.footer.privacyStatement}
          </Link>
          <Link href='https://www.digdir.no/om-oss/informasjonskapsler/707'>
            {translations.footer.informationCookies}
          </Link>
          <Link href='https://uustatus.no/nb/erklaringer/publisert/8020b962-b706-4cdf-ab8b-cdb5f480a696'>
            {translations.footer.accessibility}
          </Link>
        </SC.Column>
      </SC.Content>
    </SC.Wrapper>
  </SC.TransportPortalFooter>
);

export default TransportPortalFooter;
