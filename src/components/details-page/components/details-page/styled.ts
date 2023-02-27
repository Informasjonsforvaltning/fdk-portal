import styled from 'styled-components';
import { theme as t } from '@fellesdatakatalog/theme';
import HamburgerIconBase from '../../../../images/hamburger-menu-stroke.svg';

import SideMenuBase from '../side-menu';

const onMobileView = '@media (max-width: 900px)';

const DetailsPage = styled.article`
  flex: 1 0 auto;

  a {
    color: ${({ theme }) => theme.entityColours.dark} !important;
  }
`;

const SubBanner = styled.div`
  margin: 0;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > a {
    color: ${({ theme }) => theme.entityColours.dark} !important;
  }

  ${onMobileView} {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 15px;
    font-size: 1.6rem;
  }
`;

const MetadataQuality = styled.div`
  display: flex;
  justify-content: flex-end;
  white-space: nowrap;
  align-items: center;

  & > p {
    font-size: 2rem;
  }

  ${onMobileView} {
    margin-top: 10px;
    margin-bottom: 0;
    & > p {
      font-size: 1.6rem;
    }
  }
`;

const RatingIcon = styled.div`
  height: 18px;
  width: 30px;
  margin-left: 7px;
  margin-right: 7px;

  & > svg {
    background-color: ${({ theme }) => theme.entityColours.lighter};
    padding: 5px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    position: relative;
  }

  ${onMobileView} {
    width: 20px;
  }
`;

const Themes = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 5px;
  margin-right: -10px;

  & > * {
    padding: 1px 10px;
    border-radius: 20px;
    margin-top: 10px;
    margin-right: 10px;
    user-select: none;
    cursor: default;
  }

  & > a {
    display: inline-flex;
    align-items: center;
    color: ${({ theme }) => theme.entityColours.dark} !important;
    background: ${({ theme }) => theme.entityColours.light};
    text-decoration: none;
    cursor: pointer;

    &.open-data {
      color: white !important;
      background: ${({ theme }) => theme.entityColours.dark};
    }

    &.public-data {
      background: ${({ theme }) => theme.entityColours.light};

      & > svg > path {
        fill: ${({ theme }) => theme.entityColours.dark} !important;
      }
    }

    &.restricted-data,
    &.non-public-data {
      background: white;

      & > svg > path {
        fill: ${({ theme }) => theme.entityColours.dark} !important;
      }
    }

    &:hover {
      color: white !important;
      background: ${({ theme }) => theme.extendedColors.textDefault} !important;

      & > svg > path {
        fill: white !important;
      }
    }

    & > svg {
      display: flex;
      height: 20px;
      width: 20px;
      margin-right: 5px;

      & > path {
        fill: white !important;
      }
    }
  }
`;

const Page = styled.div`
  display: flex;
  gap: ${t.spacing('S12')};
  margin-top: 40px;
  word-break: break-word;
  ${onMobileView} {
    flex-direction: column;
  }
`;

const MenuToggle = styled.button`
  display: none;
  color: ${({ theme }) => theme.extendedColors.neutralDarker};

  ${onMobileView} {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 13px;
    border-radius: 5px;
    font-size: 1.6rem;
    border: none;
    background-color: ${({ theme }) => theme.extendedColors.neutralLight};
  }

  &:hover {
    color: ${({ theme }) => theme.extendedColors.neutralDarkest};
  }

  &:active {
    background: black;
    color: ${({ theme }) => theme.extendedColors.neutralLighter};
  }
`;

const SideMenu = styled(SideMenuBase)`
  flex: 0 0 25%;
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

    nav {
      width: 100%;

      ul > li {
        background-color: ${({ theme }) => theme.extendedColors.neutralLighter};
        border-radius: 5px;
        margin-top: 2px;
        margin-bottom: 2px;

        a {
          margin-left: 20px;
        }
      }
    }
  }
`;

const Content = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${t.spacing('S12')};
  z-index: 10;

  ${onMobileView} {
    width: auto;
    margin-top: 40px;
  }
`;

const HamburgerIcon = styled(HamburgerIconBase)`
  width: 20px;
  height: 20px;
  margin-right: 0.5em;
`;

export default {
  DetailsPage,
  SubBanner,
  MetadataQuality,
  Themes,
  Page,
  MenuToggle,
  SideMenu,
  SideMenuSmall,
  Content,
  RatingIcon,
  HamburgerIcon
};
