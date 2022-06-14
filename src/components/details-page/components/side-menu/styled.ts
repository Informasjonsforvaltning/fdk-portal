import styled from 'styled-components';

import { theme as t } from '@fellesdatakatalog/theme';

const onMobileView = '@media (max-width: 900px)';

const SideMenu = styled.aside``;

const Title = styled.h3`
  margin: 15px 0;
  font-size: 24px;
  font-weight: 600;
`;

const Menu = styled.nav`
  font-size: ${t.fontSize('FS14')};
  & > ul {
    display: flex;
    flex-direction: column;
    gap: ${t.spacing('S10')};
  }

  & > ul > li > a {
    color: ${({ theme }) => theme.entityColours.dark} !important;
  }
`;

const MenuItem = styled.li`
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
