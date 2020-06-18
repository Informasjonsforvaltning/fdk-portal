import styled from 'styled-components';
import SearchBoxTitleSC from '../search-box-title/styled';

import SearchBoxBackground from '../../../../img/illustration-search-dark.svg';

const SearchBox = styled.section`
  align-items: center;
  background-color: ${({ theme }) => theme.extendedColors.searchBoxBg};
  background-repeat: no-repeat;
  background-position: top right;
  background-image: url(${SearchBoxBackground});
  display: flex;
  flex-flow: column;
  font-size: 1.6rem;

  @media (max-width: 768px) {
    background-size: 70%;
    font-size: 1.1rem;
  }
`;

const Content = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  flex-flow: column;
  justify-content: space-between;
  padding: 0 15px;
  margin-bottom: 4em;
  margin-top: 4em;

  @media (min-width: 768px) {
    max-width: 720px;
    width: 100%;
  }

  @media (min-width: 992px) {
    max-width: 960px;
    width: 100%;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
    width: 100%;
  }

  ${SearchBoxTitleSC.Title} {
    color: ${({ theme }) => theme.extendedColors.headerBg};
    margin-bottom: 1em;
    text-align: center;
  }
`;

const SearchLinks = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  margin-top: 4em;
  width: 100%;

  @media (min-width: 992px) {
    flex-flow: row;
  }
`;

export default {
  SearchBox,
  Content,
  SearchLinks
};
