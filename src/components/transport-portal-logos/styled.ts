import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

import EnturLogoWhiteBase from '../../images/logo-entur-hvit.svg';
import LogoDigdirBase from '../../images/logo-digdir-negativ.svg';
import LogoJernbaneDirektoratetBase from '../../images/logo-jernbanedirektoratet-hvit.svg';
import StatensVegvesenBase from '../../images/logo-statens-vegvesen-negativ.svg';

const TransportPortalLogos = styled.div`
  align-items: center;
  display: inline-flex;
  justify-content: center;
  padding: 1em;

  & > svg:nth-of-type(n + 2) {
    margin-left: ${theme.spacing('S8')};
  }
`;

const EnturLogoWhite = styled(EnturLogoWhiteBase)`
  height: 55px;
  & > path {
    fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }

  @media (max-width: 900px) {
    height: 32px;
  }
`;

const LogoDigdir = styled(LogoDigdirBase)`
  height: 37px;
  & > path {
    fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }

  @media (max-width: 900px) {
    height: 23px;
  }
`;

const LogoJernbaneDirektoratet = styled(LogoJernbaneDirektoratetBase)`
  height: 45px;
  & > g {
    fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }

  @media (max-width: 900px) {
    height: 35px;
  }
`;

const StatensVegvesen = styled(StatensVegvesenBase)`
  height: 55px;
  & > path {
    fill: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }

  @media (max-width: 900px) {
    height: 40px;
  }
`;

export default {
  TransportPortalLogos,
  EnturLogoWhite,
  LogoDigdir,
  LogoJernbaneDirektoratet,
  StatensVegvesen
};
