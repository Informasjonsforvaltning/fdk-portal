import styled, { css, createGlobalStyle } from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

import { getConfig } from '../../config';

const isTransportportal = getConfig().themeNap;

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

interface dropdownMenuProps {
  desktopView: boolean;
  mobileView: boolean;
}

const DropdownMenu = styled.nav<dropdownMenuProps>`
  color: ${({ theme: t }) => t.extendedColors.neutralDarkest};
  display: ${({ desktopView }) => (desktopView ? 'inherit' : 'none')};
  position: relative;

  ${onMobileView} {
    display: ${({ mobileView }) => (mobileView ? 'inherit' : 'none')};
  }
`;

interface titleProps {
  caret: boolean;
}

const ToggleButton = styled.button<titleProps>`
  padding: 10px;
  font-size: ${theme.fontSize('FS16')};
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
        `}

  ${({ caret }) =>
    caret &&
    css`
      &:after {
        content: '\\f0d7';
        font-family: FontAwesome;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin-left: 0.5em;
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
    font-size: ${theme.fontSize('FS16')};
    padding: ${theme.spacing('S8')};
    white-space: nowrap;

    &:hover {
      background-color: ${({ theme: t }) => t.extendedColors.neutralLight};
    }

    > a {
      color: ${theme.colour(Colour.NEUTRAL, 'N70')};
    }

    > button {
      color: ${theme.colour(Colour.NEUTRAL, 'N70')};
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
    border-radius: 0px;
    position: fixed;
    width: 100vw;
    height: calc(100vh - ${bannerHeight});
    top: ${bannerHeight};
    right: 0px;
    overflow: auto;

    > .hideOnMobileView {
      display: none;
    }

    > li {
      font-size: ${theme.fontSize('FS20')};
      margin-left: 20px;
      margin-top: 20px;

      > button {
        border: none;
        background-color: transparent;
      }
    }
  }
`;

export default { GlobalStyle, DropdownMenu, ToggleButton, Dropdown };
