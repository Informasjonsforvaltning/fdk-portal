import styled from 'styled-components';

import SideMenuBase from '../side-menu';

const DetailsPage = styled.article`
  flex: 1 0 auto;
`;

const Publisher = styled.p`
  margin: 0;
  margin-top: 15px;
  font-size: 20px;
`;

const Themes = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 5px;
  margin-right: -10px;

  & > * {
    padding: 1px 10px;
    border-radius: 20px;
    margin-top: 10px;
    margin-right: 10px;
    user-select: none;
    cursor: default;
  }

  & > a {
    display: inline-flex;
    align-items: center;
    color: ${({ theme }) => theme.entityColours.dark} !important;
    background: ${({ theme }) => theme.entityColours.light};
    text-decoration: none;
    cursor: pointer;

    &.open-data {
      color: white !important;
      background: ${({ theme }) => theme.entityColours.dark};
    }

    &.public-data {
      background: ${({ theme }) => theme.entityColours.light};

      & > svg > path {
        fill: ${({ theme }) => theme.entityColours.dark};
      }
    }

    &.restricted-data,
    &.non-public-data {
      background: white;

      & > svg > path {
        fill: ${({ theme }) => theme.entityColours.dark};
      }
    }

    &:hover {
      color: white !important;
      background: ${({ theme }) => theme.colors.textDefault} !important;

      & > svg > path {
        fill: white;
      }
    }

    & > svg {
      display: flex;
      height: 20px;
      width: 20px;
      margin-right: 5px;

      & > path {
        fill: white;
      }
    }
  }
`;

const Page = styled.div`
  display: flex;
  margin-top: 40px;
`;

const SideMenu = styled(SideMenuBase)`
  width: 200px;
  margin-right: 50px;
`;

const Content = styled.main`
  width: calc(100% - 250px);
`;

export default {
  DetailsPage,
  Publisher,
  Themes,
  Page,
  SideMenu,
  Content
};
