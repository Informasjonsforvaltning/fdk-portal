import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Entity } from '../../types/enums';

const Header = styled.h1`
  font-size: 4rem;
  text-align: center;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2em;
`;

const Box = styled(Link)`
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  color: #000 !important;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 0.5em;
  padding: 0.5em 1.5em;
  text-decoration: none;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: #000;
    color: #fff !important;
  }
`;

const SortLabel = styled.span`
  font-size: 1.3em;
  font-weight: 500;
  width: 1.5em;
`;

const Title = styled.span`
  flex-grow: 1;
`;

const Info = styled.div`
  display: flex;
`;

const CountTag = styled.div<{ type?: Entity }>`
    color: ${({ theme }) => theme.colors.neutralDarker};
    text-align: center;
    background-color: ${({ type, theme }) =>
      type ? theme.colors[type]?.light : theme.colors.neutralLighter};
    border-radius: 20px;
    border: none;
    padding: .3em .6em;
    margin-right: .5em;
    width: 50px;
  }
`;

export default { Header, SearchBox, Box, SortLabel, Title, Info, CountTag };
