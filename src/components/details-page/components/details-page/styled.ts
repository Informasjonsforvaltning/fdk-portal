import styled from 'styled-components';
import { Colour, theme as t } from '@fellesdatakatalog/theme';
import HamburgerIconBase from '../../../../images/hamburger-menu-stroke.svg';

import SideMenuBase from '../side-menu';

const onMobileView = '@media (max-width: 900px)';

const DetailsPage = styled.article`
  flex: 1 0 auto;

  a {
    text-decoration: underline;
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const HeadingLeft = styled.div`
  display: flex;
  align-items: end;
`;

const SubBanner = styled.div`
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${onMobileView} {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 15px;
    font-size: 1.6rem;
  }
`;

const MetadataQuality = styled.div`
  display: flex;
  white-space: nowrap;
  padding-bottom: 0.3rem;
  padding-right: 1.5rem;

  ${onMobileView} {
    margin-top: 10px;
    margin-bottom: 0;
    & > p {
      font-size: 1.6rem;
    }
  }
`;

const Themes = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 5px;
  margin-right: -10px;

  & > li > * {
    padding: 8px;
    border-radius: var(--fds-border_radius-small);
    margin-top: 10px;
    margin-right: 10px;
    user-select: none;
    cursor: default;
  }

  & > li > a {
    //Tags
    display: inline-flex;
    align-items: center;
    color: ${({ theme }) => theme.entityColours.dark} !important;
    background: ${({ theme }) => theme.entityColours.light};
    text-decoration: none;
    cursor: pointer;

    &.open-data {
      color: black !important;
      background: var(--fds-semantic-surface-success-subtle);

      & > svg > path {
        fill: black !important;
      }
    }

    &.public-data {
      color: black !important;
      background: var(--fds-semantic-surface-success-subtle);

      & > svg > path {
        fill: black !important;
      }
    }

    &.restricted-data {
      color: black !important;
      background: var(--fds-semantic-surface-warning-default);

      & > svg > path {
        fill: black !important;
      }
    }

    &.non-public-data {
      color: black !important;
      background: var(--fds-semantic-surface-danger-subtle);

      & > svg > path {
        fill: black !important;
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

const ThemeItem = styled.li``;

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

const AccessRequest = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;

  & button {
    background-color: ${t.colour(Colour.BLUE, 'B60')};
  }
`;

const PublishingDate = styled.p`
  padding-bottom: 2rem;
  padding-top: 0.5rem;
  font-style: italic;
`;

export default {
  DetailsPage,
  SubBanner,
  MetadataQuality,
  Themes,
  ThemeItem,
  Page,
  MenuToggle,
  SideMenu,
  SideMenuSmall,
  Content,
  HamburgerIcon,
  AccessRequest,
  PublishingDate,
  Heading,
  HeadingLeft
};
