import styled from 'styled-components';
import SearchBoxTitleSC from '../search-box-title/styled';

import SearchBoxBackground from '../../../../img/illustration-search-dark.svg';

const SearchBox = styled.section`
    background-color: ${({ theme }) => theme.colors.searchBoxBg};
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
    
  }
`;

const Content = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  flex-flow: column;
  justify-content: space-between;
  padding: 4em 2em 0 2em;
  margin-bottom: 4em;

  ${SearchBoxTitleSC.Title} {
    color: ${({ theme }) => theme.colors.headerBg};
    margin-bottom: 1em;
    text-align: center;

    @media (min-width: 768px) {
      margin: 0 25% 1em 25%;
    }
  }
`;

export default {
  SearchBox,
  Content
};
