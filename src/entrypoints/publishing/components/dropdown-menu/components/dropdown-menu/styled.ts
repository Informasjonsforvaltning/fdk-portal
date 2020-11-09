import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

const DropdownMenu = styled.nav`
  position: relative;
`;

const Trigger = styled.div`
  cursor: pointer;

  &,
  & * {
    color: inherit;
  }
`;

const Menu = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + ${theme.spacing('S12')});

  &,
  & * {
    color: inherit;
  }
`;

export default { DropdownMenu, Trigger, Menu };
