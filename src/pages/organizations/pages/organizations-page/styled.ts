import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ClearIconBase from '../../../../images/icon-clear.svg';
import DatasetIconBase from '../../../../images/icon-catalog-dataset-lg.svg';
import ApiIconBase from '../../../../images/icon-catalog-api-lg.svg';
import ConceptIconBase from '../../../../images/icon-catalog-concept-lg.svg';
import InfomodelIconBase from '../../../../images/icon-catalog-infomod-lg.svg';
import CaretUpBase from '../../../../images/icon-caret-up-sm.svg';
import CaretDownBase from '../../../../images/icon-caret-down-sm.svg';
import CaretBothBase from '../../../../images/icon-caret-both-sm.svg';

import { Entity } from '../../../../types/enums';

const Header = styled.h1`
  font-size: 4rem;
  font-weight: 600;
  text-align: center;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2em;
`;

const Filter = styled.div`
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid;
  font-size: 3rem;
  display: flex;
  height: 2.5em;
  padding: 0 0.5em;
  position: relative;
  width: 60%;
  justify-content: space-between;

  @media (max-width: 768px) {
    font-size: 2rem;
    width: 100%;
  }

  input {
    border: none;
    color: ${({ theme }) => theme.extendedColors.neutralDarker};
    flex: 1;
    line-height: normal;
    outline: none;
    width: 80%;
  }

  .search-clear {
    background-color: transparent;
    border: none;
    margin-right: 0.3em;
    padding: 0;
  }
`;

const ClearIcon = styled(ClearIconBase)`
  width: 20px;
  height: 20px;

  & > path {
    fill: ${({ theme }) => theme.extendedColors.neutralDarker};
  }

  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
  }
`;

const Box = styled(Link)`
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  color: #000 !important;
  display: flex;
  flex-wrap: wrap;
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
  margin-left: 2em;
  margin-top: 0.2em;
  width: 100%;

  @media (min-width: 768px) {
    margin: 0;
    width: auto;
  }
`;

const CountTag = styled.div<{ type?: Entity }>`
  color: ${({ theme }) => theme.extendedColors.neutralDarker};
  text-align: center;
  background-color: ${({ type, theme }) =>
    type
      ? theme.extendedColors[type]?.light
      : theme.extendedColors.neutralLighter};
  border-radius: 20px;
  border: none;
  padding: 0.3em 0.6em;
  width: 50px;

  &:nth-of-type(n + 2) {
    margin-left: 1.5em;
  }
`;

const SortRow = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.extendedColors.neutralDarker};
  border-radius: 5px;
  color: #fff !important;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.5em;
  padding: 0.5em 1.5em;
  text-decoration: none;

  & ${Title} {
    padding-left: 1.5em;
    font-weight: 700;
  }
`;

const DatasetIcon = styled(DatasetIconBase)`
  width: 30px;
  height: 30px;
  & > path {
    fill: ${({ theme }) => theme.extendedColors.dataset.light};
  }
`;

const ApiIcon = styled(ApiIconBase)`
  width: 30px;
  height: 30px;
  & > path {
    fill: ${({ theme }) => theme.extendedColors.dataservice.light};
  }
`;

const ConceptIcon = styled(ConceptIconBase)`
  width: 30px;
  height: 30px;
  & > path {
    fill: ${({ theme }) => theme.extendedColors.concept.light};
  }
`;

const InfomodelIcon = styled(InfomodelIconBase)`
  width: 30px;
  height: 30px;
  & > path {
    fill: ${({ theme }) => theme.extendedColors.informationmodel.light};
  }
`;

const CaretUp = styled(CaretUpBase)`
  width: 20px;
  height: 20px;
`;

const CaretDown = styled(CaretDownBase)`
  width: 20px;
  height: 20px;
`;

const CaretBoth = styled(CaretBothBase)`
  width: 20px;
  height: 20px;
`;

const SortButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: end;
  color: #fff;
  background-color: transparent;
  border: none;
  width: 50px;

  &:nth-of-type(n + 2) {
    margin-left: 1.5em;
  }

  &:hover > svg > path {
    fill: #fff;
  }
`;

const TitleSortButton = styled(SortButton)`
  width: auto;
`;

export default {
  Header,
  SearchBox,
  Filter,
  ClearIcon,
  Box,
  SortLabel,
  Title,
  Info,
  CountTag,
  SortRow,
  SortButton,
  TitleSortButton,
  DatasetIcon,
  ApiIcon,
  ConceptIcon,
  InfomodelIcon,
  CaretUp,
  CaretDown,
  CaretBoth
};
