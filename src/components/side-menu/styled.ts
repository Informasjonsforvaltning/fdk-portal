import styled, { css, keyframes } from 'styled-components';
import { Colour, Unit, theme as t } from '@fellesdatakatalog/theme';

const onMobileView = '@media (max-width: 900px)';

interface Props {
  $isSticky?: boolean;
}

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
  font-size: ${t.fontSize('FS14', Unit.REM)};
  & > ul {
    display: flex;
    flex-direction: column;
    gap: ${t.spacing('S10')};
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
      width: 8%;
    `}
`;

const MenuItem = styled.li`
  align-items: center;
  display: flex;
  list-style: none;

  & > a {
    color: ${({ theme }) => theme.dark};
    flex: 1;
    text-decoration: none;
    cursor: pointer;
    padding: ${t.spacing('S10')};
  }
  & > a.active {
    background-color: ${({ theme }) => theme.dark};
    border-radius: 5px;
    color: ${t.colour(Colour.NEUTRAL, 'N0')};
    flex: 1;
  }

  &:hover {
    background-color: ${({ theme }) => theme.light};
    border-radius: 5px;
    flex: 1;
  }

  ${onMobileView} {
    margin: 0;
    padding: 12px 0;
  }
`;

export default { Menu, MenuItem };
