import React from 'react';
import ExternalFooter from '@fellesdatakatalog/external-footer';

import { getConfig } from '../../config';
import TransportPortalFooter from '../transport-portal-footer';

const isTransportPortal = getConfig().themeNap;

const Footer = () => (
  <>{!isTransportPortal ? <ExternalFooter /> : <TransportPortalFooter />}</>
);

export default Footer;
