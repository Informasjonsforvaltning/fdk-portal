import styled from 'styled-components';

const SideMenu = styled.aside``;

const Title = styled.h3`
  margin: 15px 0;
  font-size: 24px;
`;

const Menu = styled.nav`
  & > ul {
    padding: 0;
  }

  & > ul > li {
    border-top: 1px solid ${({ theme }) => theme.entityColours.light};

    &:last-of-type {
      border-bottom: 1px solid ${({ theme }) => theme.entityColours.light};
    }

    & > a {
      color: ${({ theme }) => theme.entityColours.dark} !important;
    }
  }
`;

const MenuItem = styled.li`
  margin: 0;
  padding: 12px 0;
  list-style: none;
  border-top: 1px solid red;
  font-weight: bold;

  &:last-of-type {
    border-bottom: 1px solid red;
  }

  & > a {
    text-decoration: none;
    cursor: pointer;
  }
`;

export default { SideMenu, Title, Menu, MenuItem };
