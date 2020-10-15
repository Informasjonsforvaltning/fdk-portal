import styled, { css, createGlobalStyle } from 'styled-components';
import { getConfig } from '../../config';

const isTransportportal = getConfig().themeNap;

const onMobileView = '@media (max-width: 990px)';

type globalProps = {
  dropdownOpen: boolean;
};

const GlobalStyle = createGlobalStyle<globalProps>`
  body {
    ${onMobileView} {
      ${({ dropdownOpen }) =>
        dropdownOpen &&
        css`
          height: 100vh;
          overflow-y: hidden;
        `}
    }
  }
`;

type dropdownMenuProps = {
  desktopView: boolean;
  mobileView: boolean;
};

const DropdownMenu = styled.nav<dropdownMenuProps>`
  color: ${({ theme }) => theme.extendedColors.neutralDarkest};
  display: ${({ desktopView }) => (desktopView ? 'inherit' : 'none')};

  ${onMobileView} {
    display: ${({ mobileView }) => (mobileView ? 'inherit' : 'none')};
  }
`;

type titleProps = {
  caret: boolean;
};

const Title = styled.button<titleProps>`
  padding: 10px;
  font-size: 16px;
  border: none;
  ${() =>
    isTransportportal
      ? css`
          background-color: ${({ theme }) =>
            theme.extendedColors.neutralDarkest};
          color: ${({ theme }) => theme.extendedColors.neutralLightest};
        `
      : css`
          background-color: ${({ theme }) => theme.extendedColors.headerBg};
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

type dropdownProps = {
  open: boolean;
};

const bannerHeight = '8rem';

const Dropdown = styled.ul<dropdownProps>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.extendedColors.neutralLight};
  z-index: 1000;
  position: absolute;
  right: 0;
  overflow-y: scroll;

  ${() =>
    isTransportportal
      ? css`
          background-color: ${({ theme }) => theme.extendedColors.header};
        `
      : css`
          background-color: ${({ theme }) => theme.extendedColors.headerBg};
        `}

  ${onMobileView} {
    position: fixed;
    width: 100vw;
    height: calc(100vh - ${bannerHeight});
    top: ${bannerHeight};
  }
`;

export default { GlobalStyle, DropdownMenu, Title, Dropdown };
