import styled, { css, createGlobalStyle } from 'styled-components';
import { theme, Colour, Unit } from '@fellesdatakatalog/theme';
import ChevronDownIconBase from '@fellesdatakatalog/icons/assets/svg/chevron-down-stroke.svg';

import HamburgerMenuIconBase from '../../images/hamburger-menu-stroke.svg';

import { getConfig } from '../../config';

const isTransportportal = getConfig().isNapProfile;

const onMobileView = '@media (max-width: 990px)';

interface globalProps {
  dropdownOpen: boolean;
}

const GlobalStyle = createGlobalStyle<globalProps>`
  body {
    ${onMobileView} {
      ${({ dropdownOpen }) =>
        dropdownOpen &&
        css`
          height: 100vh;
          overflow-y: hidden;

          // For safari:
          position: fixed;
          left: 0;
          right: 0;

          .fdk-header {
            // Maintain header position when scrollbar is removed
            padding-right: 34px !important;
          }
        `}
    }
  }
`;

interface DropdownMenuProps {
  mobileView: boolean;
}

const ToggleButton = styled.button`
  font-size: ${theme.fontSize('FS16', Unit.REM)};
  border: none;

  &:focus {
    outline-offset: 3px;
    outline: 2px solid orange;
  }

  ${({ theme: extendedTheme }) =>
    isTransportportal
      ? css`
          background-color: ${extendedTheme.extendedColors.neutralDark};
          color: ${theme.colour(Colour.NEUTRAL, 'N0')};
        `
      : css`
          background-color: ${extendedTheme.extendedColors.headerBg};
          color: currentColor !important;
        `}
`;

const DropdownMenu = styled.nav<DropdownMenuProps>`
  color: currentColor;
  display: ${({ mobileView }) => (mobileView ? 'none' : 'inherit')};
  position: relative;

  ${onMobileView} {
    display: ${({ mobileView }) => (mobileView ? 'inherit' : 'none')};
  }

  & > ${ToggleButton} {
    padding: ${({ mobileView }) => (mobileView ? '0' : '10px')};
  }
`;

const ChevronDownIcon = styled(ChevronDownIconBase)`
  width: 16px;
  height: 16px;
  margin-left: 0.3em;

  ${() =>
    isTransportportal
      ? css`
          & * {
            stroke: ${theme.colour(Colour.NEUTRAL, 'N0')};
          }
        `
      : css`
          & * {
            stroke: ${theme.colour(Colour.NEUTRAL, 'N60')};
          }
        `}
`;

const HamburgerMenuIcon = styled(HamburgerMenuIconBase)`
  width: 50px;
  height: 50px;
  margin-left: 0.3em;

  ${() =>
    isTransportportal
      ? css`
          & * {
            stroke: ${theme.colour(Colour.NEUTRAL, 'N0')};
          }
        `
      : css`
          & * {
            stroke: ${theme.colour(Colour.NEUTRAL, 'N60')};
          }
        `}
`;

interface dropdownProps {
  open: boolean;
}

const bannerHeight = '8rem';

const Dropdown = styled.ul<dropdownProps>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  border: 1px solid ${({ theme: t }) => t.extendedColors.neutralLight};
  z-index: 1000;
  position: absolute;
  top: 40px;
  box-shadow: 2px 5px 6px rgba(0, 0, 0, 0.15);
  border-radius: 5px;

  > li {
    font-size: ${theme.fontSize('FS16', Unit.REM)};
    padding: ${theme.spacing('S8')};
    white-space: nowrap;

    &:hover {
      background-color: ${({ theme: t }) => t.extendedColors.neutralLight};
    }

    > a {
      ${() =>
        isTransportportal
          ? css`
              color: ${theme.colour(Colour.NEUTRAL, 'N70')};
            `
          : css`
              color: currentColor !important;
            `}
    }

    > button {
      border: none;
      background-color: transparent;
      width: 100%;
      text-align: left;
    }
  }

  ${({ theme: t }) =>
    isTransportportal
      ? css`
          background-color: ${t.extendedColors.header};
        `
      : css`
          background-color: ${t.extendedColors.headerBg};
        `}

  ${onMobileView} {
    overflow-y: scroll;
    overflow-x: hidden;
    border-radius: 0px;
    position: fixed;
    width: 100%;
    height: calc(100% - ${bannerHeight});
    list-style: none;
    top: ${bannerHeight};
    right: 0px;

    ul {
      margin-left: ${theme.spacing('S12')};
    }

    li {
      display: block;
      font-size: ${theme.fontSize('FS20', Unit.REM)};
      margin: 0px;
      padding: ${theme.spacing('S16')} 0 ${theme.spacing('S10')}
        ${theme.spacing('S24')};

      > button {
        border: none;
        background-color: transparent;
      }

      :hover {
        background: none;
      }
    }

    > li:not(:last-child) {
      border-bottom: 1px solid ${theme.colour(Colour.NEUTRAL, 'N30')};
    }
  }
`;

export default {
  GlobalStyle,
  DropdownMenu,
  ToggleButton,
  ChevronDownIcon,
  HamburgerMenuIcon,
  Dropdown
};
