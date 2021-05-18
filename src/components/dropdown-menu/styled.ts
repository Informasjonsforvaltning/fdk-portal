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

const Title = styled.button<titleProps>`
  padding: 10px;
  font-size: 16px;
  border: none;
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
  right: 0;
  top: 40px;
  overflow-y: auto;

  ${({ theme: t }) =>
    isTransportportal
      ? css`
          background-color: ${t.extendedColors.header};
        `
      : css`
          background-color: ${t.extendedColors.headerBg};
        `}

  ${onMobileView} {
    position: fixed;
    width: 100vw;
    height: calc(100vh - ${bannerHeight});
    top: ${bannerHeight};
  }
`;

export default { GlobalStyle, DropdownMenu, Title, Dropdown };
