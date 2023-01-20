import React from 'react';
import ExternalFooter from '@fellesdatakatalog/external-footer';

import { getConfig } from '../../config';
import TransportPortalFooter from '../transport-portal-footer';
import localization from '../../lib/localization';

const isTransportPortal = getConfig().themeNap;

const Footer = () =>
  isTransportPortal ? (
    <TransportPortalFooter />
  ) : (
    <ExternalFooter language={localization.getLanguage()} />
  );

export default Footer;
