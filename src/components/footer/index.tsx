import React from 'react';
import ExternalFooter from '@fellesdatakatalog/external-footer';
import Link from '@fellesdatakatalog/link';

import { getConfig } from '../../config';
import TransportPortalFooter from '../transport-portal-footer';
import localization from '../../lib/localization';
import { openConsentBanner } from '../../lib/consent';

import SC from './styled';

const isTransportPortal = getConfig().isNapProfile;

const Footer = () =>
  isTransportPortal ? (
    <TransportPortalFooter />
  ) : (
    <>
      <ExternalFooter language={localization.getLanguage()} />
      {/* The third-party footer takes no custom links, so the consent-change control is
          appended below it to keep it reachable on data.norge pages too. */}
      <SC.ConsentBar>
        <Link
          href='https://www.digdir.no/om-oss/informasjonskapsler/707'
          onClick={(event: React.MouseEvent) => {
            event.preventDefault();
            openConsentBanner();
          }}
        >
          {localization.cookieConsent.manage}
        </Link>
      </SC.ConsentBar>
    </>
  );

export default Footer;
