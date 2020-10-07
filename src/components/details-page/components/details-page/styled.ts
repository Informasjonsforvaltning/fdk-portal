import styled from 'styled-components';

import SideMenuBase from '../side-menu';

const DetailsPage = styled.article`
  flex: 1 0 auto;
`;

const Publisher = styled.p`
  margin: 0;
  font-size: 20px;
`;

const SubBanner = styled.div`
  margin: 0;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MetadataQuality = styled.div`
  display: flex;
  justify-content: flex-end;
  white-space: nowrap;
  align-items: center;

  & > p {
    color: ${({ theme }) => theme.entityColours.dark};
    font-size: 20px;
    line-height: 1;
  }
`;

const RatingIcon = styled.div`
  height: 18px;
  width: 30px;
  margin-left: 7px;
  margin-right: 7px;

  & > svg {
    background-color: ${({ theme }) => theme.entityColours.lighter};
    padding: 5px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    position: relative;
  }
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
      background: ${({ theme }) => theme.extendedColors.textDefault} !important;

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
  SubBanner,
  Publisher,
  MetadataQuality,
  Themes,
  Page,
  SideMenu,
  Content,
  RatingIcon
};
