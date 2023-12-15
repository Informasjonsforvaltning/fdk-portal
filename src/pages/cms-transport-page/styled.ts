import styled from 'styled-components';

import { Colour, theme, Unit } from '@fellesdatakatalog/theme';
import { Backdrop as MuiBackdrop } from '@mui/material';
import SideMenuBase from '../../components/side-menu';

import HamburgerIconBase from '../../images/hamburger-menu-stroke.svg';

const onMobileView = '@media (max-width: 900px)';
const customBreakingPoint = '@media (max-width: 992px)';

const TransportPage = styled.article`
  display: flex;
  gap: ${theme.spacing('S16', Unit.EM)};
  word-break: break-word;
  width: 790px;

  ${customBreakingPoint} {
    && {
      max-width: fit-content;
    }
  }

  ${onMobileView} {
    flex-direction: column;
  }
`;

const Aside = styled.aside`
  display: flex;
  flex: 0 0 20%;
  flex-direction: column;

  ${onMobileView} {
    flex: 1;
  }
`;

const Article = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing('S10')};
  z-index: 5;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: ${theme.fontSize('FS48', Unit.REM)};
  font-weight: ${theme.fontWeight('FW500')};
  padding-left: 0;
`;

const Description = styled.p`
  font-size: ${theme.fontSize('FS20')};
`;

const Content = styled.p`
  & > div {
    & > h2 {
      font-size: ${theme.fontSize('FS32', Unit.REM)};
      font-weight: ${theme.fontWeight('FW500')};
      padding: ${theme.spacing('S6')};
      padding-left: 0;
      margin-bottom: ${theme.spacing('S10', Unit.EM)};
      margin-top: ${theme.spacing('S48')};
    }
  }

  & a {
    text-decoration: underline;
  }
`;

const ImageWrapper = styled.div`
  margin-bottom: ${theme.spacing('S16')};
`;

const Image = styled.img`
  max-width: 100%;
`;

const ImageText = styled.span`
  font-size: ${theme.fontSize('FS14', Unit.REM)};
`;

const SideMenu = styled(SideMenuBase)`
  min-width: 260px;
  ${onMobileView} {
    display: none;
    width: auto;
    margin-right: 0;
  }
`;

const SideMenuSmall = styled(SideMenuBase)`
  display: none;
  ${onMobileView} {
    display: flex;
    flex: 1;
    ul {
      flex: 1;
      li {
        background-color: ${({ theme: t }) => t.extendedColors.neutralLighter};
        border-radius: 5px;
        margin-top: 2px;
        margin-bottom: 2px;

        a {
          background-color: transparent !important;
          color: ${({ theme: t }) => t.dark};
          &.active {
            color: ${({ theme: t }) => t.dark} !important;
          }
        }

        a,
        span {
          margin-left: 20px;
        }
      }
    }
  }
`;

const MenuToggle = styled.button`
  display: none;
  color: ${({ theme: t }) => t.dark};

  ${onMobileView} {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 13px;
    border-radius: 5px;
    font-size: ${theme.fontSize('FS16', Unit.REM)};
    border: none;
    background-color: ${({ theme: t }) => t.light};
  }

  &:hover {
    color: ${({ theme: t }) => t.darker};
  }

  &:active {
    background: black;
    color: ${({ theme: t }) => t.lighter};
  }
`;

const Backdrop = styled(MuiBackdrop)`
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  z-index: ${theme.colour(Colour.NEUTRAL, 'N0')} + 1;
`;

const HamburgerIcon = styled(HamburgerIconBase)`
  width: 20px;
  height: 20px;
  margin-right: 0.5em;
`;

export default {
  TransportPage,
  Aside,
  Article,
  Title,
  Description,
  Content,
  ImageWrapper,
  Image,
  ImageText,
  SideMenu,
  SideMenuSmall,
  MenuToggle,
  Backdrop,
  HamburgerIcon
};
