import styled, { css, keyframes } from 'styled-components';

import { theme as t } from '@fellesdatakatalog/theme';

const onMobileView = '@media (max-width: 900px)';

interface Props {
  $isSticky?: boolean;
}

const SideMenu = styled.aside``;

const Title = styled.h3`
  margin: 15px 0;
  font-size: 24px;
  font-weight: 600;
`;

export const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(100);
  }
`;

const Menu = styled.nav<Props>`
  font-size: ${t.fontSize('FS14')};
  & > ul {
    display: flex;
    flex-direction: column;
    gap: ${t.spacing('S10')};
  }

  & > ul > li > a {
    color: ${({ theme }) => theme.entityColours.dark} !important;
    padding: ${t.spacing('S10')};
    &.active {
      background-color: ${({ theme }) => theme.entityColours.dark} !important;
      border-radius: 5px;
      color: white !important;
      flex: 1;
      transition: background-color 200ms ease-in;
    }
    &:hover {
      background-color: ${({ theme }) => theme.entityColours.light};
      border-radius: 5px;
      flex: 1;
    }
  }
  ${({ $isSticky }) =>
    $isSticky &&
    css`
      animation-duration: 500ms;
      animation-timing-function: ease-out;
      animation-fill-mode: forwards;
      animation-name: ${slideDown};
      position: fixed;
      top: ${t.spacing('S16')};
      width: 10%;
    `}
`;

const MenuItem = styled.li`
  align-items: center;
  display: flex;
  list-style: none;
  ${onMobileView} {
    margin: 0;
    padding: 12px 0;
  }

  & > a {
    text-decoration: none;
    cursor: pointer;
  }
`;

export default { SideMenu, Title, Menu, MenuItem };
