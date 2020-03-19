import styled from 'styled-components';

import RoundedTagSC from '../../../rounded-tag/styled';

const SearchHit = styled.article`
    background-color: #FFF;
    border-radius: 5px;
    padding: 1em;
    margin-bottom: 1em;
    
    a {
        text-decoration: none;
        cursor: pointer;
        
        &:hover {
            text-decoration: underline;
        }
    }
  }
`;

const Publisher = styled.div`
  margin-bottom: 0.5em;
`;

const Description = styled.p`
  font-size: 2rem;
`;

const OpenData = styled.div`
  display: flex;
  margin-bottom: 1em;
  svg {
    width: 2.4rem;
    margin-right: 0.5em;
    path {
      fill: #fff;
    }
  }

  ${RoundedTagSC.RoundedTag} {
    background-color: ${({ theme }) => theme.dark};
    color: #fff !important;
    &:hover {
      color: #fff;
      background-color: #121619;
      cursor: default;
      text-decoration: none;
    }
  }
`;

const AccessRight = styled.div`
  display: flex;
  margin-bottom: 1em;
  svg {
    width: 20px;
    margin-right: 0.5em;
    path {
      fill: ${({ theme }) => theme.dark};
    }
  }

  ${RoundedTagSC.RoundedTag} {
    background-color: ${({ theme }) => theme.lighter};
    color: ${({ theme }) => theme.dark};
    &:hover {
      color: #fff !important;
      cursor: default;
      background-color: #121619 !important;
      text-decoration: none;
      svg {
        path {
          fill: #fff;
        }
      }
    }
  }
`;

const Theme = styled.div`
  display: flex;
  margin-bottom: 1em;
  flex-wrap: wrap;

  ${RoundedTagSC.RoundedTag} {
    background-color: ${({ theme }) => theme.lighter};
    color: ${({ theme }) => theme.dark} !important;
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    padding: 0 0.6em;
    &:hover {
      color: #fff !important;
      background-color: #121619 !important;
      text-decoration: none;
    }
  }
`;

const Format = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1em;
  span {
    border: 1px solid;
    border-color: ${({ theme }) => theme.dark};
    border-radius: 5px;
    font-size: 1.3rem;
    padding: 0.1em 0.2em;
    margin-bottom: 0.5em;
    margin-right: 0.5em;
  }
`;

const Data = styled.div`
  margin-bottom: 1em;
`;

export default {
  SearchHit,
  Publisher,
  Description,
  OpenData,
  AccessRight,
  Theme,
  Format,
  Data
};
