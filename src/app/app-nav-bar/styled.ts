import styled, { css } from 'styled-components';
import { theme, Colour, Unit } from '@fellesdatakatalog/theme';

import LogoSVG from '../../images/fdk-logo.svg';
import DemoLogoSVG from '../../images/fdk-logo-demo.svg';
import NapLogoSVG from '../../images/logo-transport.svg';
import { getConfig } from '../../config';

const isTransportportal = getConfig().isNapProfile;

const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 80px;
  position: relative;
  z-index: 999;

  ${({ theme: extendedTheme }) =>
    isTransportportal
      ? css`
          background-color: ${extendedTheme.extendedColors.neutralDark};
          color: ${theme.colour(Colour.NEUTRAL, 'N0')};
        `
      : css`
          background-color: ${extendedTheme.extendedColors.headerBg};
        `}
`;

const Nav = styled.nav`
  align-items: center;
  display: flex;
  justify-content: space-between;
  overflow-wrap: break-word;
  width: 100%;
`;

const Logo = styled(LogoSVG)`
  height: 40px;
`;

const DemoLogo = styled(DemoLogoSVG)`
  height: 40px;
`;

const NapLogo = styled(NapLogoSVG)``;

const ListItem = styled.li`
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  & > a {
    display: block;
    padding: 0;
    text-decoration: none !important;

    &:hover {
      text-decoration: underline !important;
    }

    & > svg {
      margin-left: 0.3rem;
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 990px) {
    display: none;
  }
`;

const NavigationLinks = styled.ul`
  display: flex;
  align-items: center;
  margin-bottom: 0px;
  margin-right: 1em;
  font-size: ${theme.fontSize('FS16', Unit.REM)};

  & > li {
    ${() =>
      isTransportportal
        ? css`
            & > a,
            & > a > div,
            & > button {
              color: ${theme.colour(Colour.NEUTRAL, 'N0')} !important;
            }
          `
        : css`
            & > a,
            & > a > div,
            & > button {
              color: ${theme.colour(Colour.NEUTRAL, 'N60')} !important;
            }
          `}
  }

  & > li:nth-of-type(n + 2) {
    margin-left: ${theme.spacing('S16')};
  }
`;

const Button = styled.button`
  color: ${theme.colour(Colour.NEUTRAL, 'N60')} !important;
  &:focus {
    outline-offset: 3px;
    outline: 2px solid orange;
  }
`;

export default {
  Header,
  Nav,
  Logo,
  DemoLogo,
  NapLogo,
  ContentWrapper,
  NavigationLinks,
  ListItem,
  Button
};
