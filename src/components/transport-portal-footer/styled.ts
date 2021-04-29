import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

import FooterIllustration from '../../img/illustration-footer-portal.svg';

import { TransportPortalLogosSC } from '../transport-portal-logos';

const TransportPortalFooter = styled.footer`
  display: flex;
  justify-content: center;
  position: relative;
  min-height: 350px;
  padding: ${theme.spacing('S48')} 0;
  font-size: ${theme.fontSize('FS16')};
  background-color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  background-repeat: no-repeat;
  background-position: bottom left;
  background-size: 40%;

  @media screen and (min-width: 1200px) {
    background-image: url(${FooterIllustration});
  }

  &,
  & * {
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1140px;

  @media screen and (max-width: 1200px) {
    padding: 0 ${theme.spacing('S48')};
    max-width: 100%;
  }

  & > ${TransportPortalLogosSC.TransportPortalLogos} {
    margin-bottom: ${theme.spacing('S40')};
    padding: 0;
    @media screen and (min-width: 1200px) {
      justify-content: flex-start;
    }
  }
`;

const Column = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: ${theme.spacing('S16')};
  }

  @media screen and (max-width: 1200px) {
    align-items: center;
    margin-top: ${theme.spacing('S32')};

    & > span {
      text-align: center;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (min-width: 1200px) {
    & > ${Column}:first-of-type {
      width: 40%;
    }

    & > ${Column}:last-of-type {
      margin-right: ${theme.spacing('S24')};
    }
  }

  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
`;

export default { TransportPortalFooter, Wrapper, Content, Column };
