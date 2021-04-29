import React, { FC } from 'react';

import SC from './styled';

interface Props {}

const TransportPortalLogos: FC<Props> = () => (
  <SC.TransportPortalLogos>
    <SC.StatensVegvesen />
    <SC.LogoJernbaneDirektoratet />
    <SC.EnturLogoWhite />
    <SC.LogoDigdir />
  </SC.TransportPortalLogos>
);

export default TransportPortalLogos;

export { SC as TransportPortalLogosSC };
