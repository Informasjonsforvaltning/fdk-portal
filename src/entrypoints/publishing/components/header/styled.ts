import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';
import LinkBase from '@fellesdatakatalog/link';

import LogoSVG from '../../../../images/fdk-publishing-logo-negative.svg';

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 80px;
  background: ${theme.colour(Colour.NEUTRAL, 'N60')};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 1140px;
  margin: 0 auto;
`;

const Logo = styled(LogoSVG)`
  height: 75px;
`;

const Link = styled(LinkBase)`
  & > div {
    padding: 0;
    border: none;
  }
`;

const NavigationLinks = styled.ul`
  display: flex;
  margin: 0 auto;

  & > li * {
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }

  & > li:nth-of-type(n + 2) {
    margin-left: ${theme.spacing('S24')};
  }
`;

export default { Header, Row, Logo, NavigationLinks, Link };
