import styled from 'styled-components';
import { Colour, theme as t } from '@fellesdatakatalog/theme';

const onMobileView = '@media (max-width: 900px)';

const Menu = styled.nav`
  font-size: ${t.fontSize('FS14')};
  & > ul {
    display: flex;
    flex-direction: column;
    gap: ${t.spacing('S10')};
  }
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
