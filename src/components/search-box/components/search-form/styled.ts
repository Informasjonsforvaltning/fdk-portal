import styled, { css } from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';

import { Link } from 'react-router-dom';

import ClearIconBase from '../../../../images/icon-clear.svg';
import DatasetIconBase from '../../../../images/icon-catalog-dataset-lg.svg';
import ApiIconBase from '../../../../images/icon-catalog-api-lg.svg';
import ConceptIconBase from '../../../../images/icon-catalog-concept-lg.svg';
import InfomodelIconBase from '../../../../images/icon-catalog-infomod-lg.svg';
import DataServiceIconBase from '../../../../images/icon-catalog-service-lg.svg';

const SuggestionsContainer = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  z-index: 999;
  top: 2.5em;
  left: -1px;
  width: calc(100% + 2px);
  overflow: hidden;

  border: 1px solid ${({ theme: t }) => t.extendedColors.neutralDarker};
  border-radius: 0px 0px 5px 5px;
  border-top: 0;
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};
`;

const Suggestion = styled(Link)`
  color: ${({ theme: t }) => t.extendedColors.neutralDarker} !important;
  font-size: ${theme.fontSize('FS16')};
  padding: ${theme.spacing('S8')};

  &:hover,
  :focus {
    color: ${({ theme: t }) => t.extendedColors.neutralDarker};
    text-decoration: none;
    background-color: ${theme.colour(Colour.NEUTRAL, 'N15')};
  }
`;

const SuggestionDivider = styled.hr`
  width: 75%;
  align-self: center;
  padding: 0px;
  margin: 0px;

  margin-top: ${theme.spacing('S8')};
`;

const SearchForm = styled.form<{ suggestionsOpen: boolean }>`
  align-items: center;
  background-color: #fff;
  border-radius: ${({ suggestionsOpen }) =>
    suggestionsOpen ? '5px 5px 0px 0px' : '5px'};
  font-size: 3rem;
  display: flex;
  height: 2.5em;
  padding: 0 0.5em;
  position: relative;
  width: 60%;
  justify-content: space-between;

  &:not(:focus-within) {
    border-radius: 5px;

    & > ${SuggestionsContainer} {
      visibility: hidden;
    }
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    width: 100%;
  }

  input {
    border: none;
    color: ${({ theme: t }) => t.extendedColors.neutralDarker};
    flex: 1;
    line-height: normal;
    outline: none;
    width: 80%;

    &::placeholder {
      font-weight: ${theme.fontWeight('FW400')};
    }
  }

  .search-clear {
    background-color: transparent;
    border: none;
    margin-right: 0.3em;
    outline: none;
    padding: 0;
  }

  .search-button {
    align-items: center;
    border: none;
    border-radius: 5px;
    background-color: ${({ theme: t }) => t.extendedColors.neutralDarker};
    color: #fff;
    display: flex;
    font-size: 0.7em;
    font-weight: 300;
    padding: 0.6em 1em;
    line-height: 1.2;

    &:hover {
      background-color: ${({ theme: t }) => t.extendedColors.neutralDarkest};
    }

    & > img {
      margin-right: 0.2em;
      width: 1em;
    }
  }
`;

const ClearIcon = styled(ClearIconBase)`
  width: 20px;
  height: 20px;

  & > path {
    fill: ${({ theme: t }) => t.extendedColors.neutralDarker};
  }

  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
  }
`;

const iconStyle = (entity: string) => css`
  width: 30px;
  height: 30px;
  padding: ${theme.spacing('S4')};
  margin-right: ${theme.spacing('S4')};
  background-color: ${({ theme: t }) => t.extendedColors[entity].light};
  border-radius: 50%;
  & > path {
    fill: ${({ theme: t }) => t.extendedColors[entity].dark};
  }
`;

const DatasetIcon = styled(DatasetIconBase)`
  ${iconStyle('dataset')}
`;

const ApiIcon = styled(ApiIconBase)`
  ${iconStyle('dataservice')};
`;

const ConceptIcon = styled(ConceptIconBase)`
  ${iconStyle('concept')};
`;

const InfomodelIcon = styled(InfomodelIconBase)`
  ${iconStyle('informationmodel')};
`;

const DataServiceIcon = styled(DataServiceIconBase)`
  ${iconStyle('informationmodel')};
`;

export default {
  SearchForm,
  ClearIcon,
  SuggestionsContainer,
  Suggestion,
  SuggestionDivider,
  DatasetIcon,
  ApiIcon,
  ConceptIcon,
  InfomodelIcon,
  DataServiceIcon
};
