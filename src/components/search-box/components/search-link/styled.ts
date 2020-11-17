import styled from 'styled-components';
import { Link } from 'react-router-dom';

import DatasetIconBase from '../../../../images/icon-catalog-dataset-lg.svg';
import ApiIconBase from '../../../../images/icon-catalog-api-lg.svg';
import ConceptIconBase from '../../../../images/icon-catalog-concept-lg.svg';
import InfomodIconBase from '../../../../images/icon-catalog-infomod-lg.svg';
import PublicServiceIconBase from '../../../../images/icon-catalog-service-lg.svg';
import { Entity } from '../../../../types/enums';

const SearchLink = styled(Link)<{ type?: Entity }>`
  align-items: center;
  background-color: ${({ type, theme }) =>
    type ? theme.extendedColors[type]?.light : '#FFF'};
  border-radius: 5px;
  color: ${({ theme }) => theme.extendedColors.neutralDarker} !important;
  display: flex;
  font-size: 1.8rem;
  margin-bottom: 1em;
  padding: 1em;
  text-decoration: none;
  word-break: break-all;
  transition: all 200ms ease-in-out;

  svg {
    path {
      fill: ${({ type, theme }) =>
        type ? theme.extendedColors[type]?.dark : '#121619'};
    }
  }

  span:last-child {
    font-weight: 500;
    margin-left: 0.2em;
    text-align: center;
  }

  @media (min-width: 992px) {
    flex-flow: column;
    font-size: 1.6rem;
    width: 23%;

    span:last-child {
      font-size: 1.8rem;
    }
  }

  &:hover {
    background-color: #121619;
    color: #fff !important;
    svg {
      path {
        fill: #fff;
      }
    }
  }
`;

const DatasetIcon = styled(DatasetIconBase)`
  height: 1.5em;
  margin-right: 0.5em;

  @media (min-width: 992px) {
    height: 3em;
    margin-right: 0;
    margin-bottom: 0.5em;
  }
`;

const ApiIcon = styled(ApiIconBase)`
  height: 1.5em;
  margin-right: 0.5em;

  @media (min-width: 992px) {
    height: 3em;
    margin-right: 0;
    margin-bottom: 0.5em;
  }
`;

const ConceptIcon = styled(ConceptIconBase)`
  height: 1.5em;
  margin-right: 0.5em;

  @media (min-width: 992px) {
    height: 3em;
    margin-right: 0;
    margin-bottom: 0.5em;
  }
`;

const InfomodIcon = styled(InfomodIconBase)`
  height: 1.5em;
  margin-right: 0.5em;

  @media (min-width: 992px) {
    height: 3em;
    margin-right: 0;
    margin-bottom: 0.5em;
  }
`;

const PublicServiceIcon = styled(PublicServiceIconBase)`
  height: 1.5em;
  margin-right: 0.5em;

  @media (min-width: 992px) {
    height: 3em;
    margin-right: 0;
    margin-bottom: 0.5em;
  }
`;

export default {
  SearchLink,
  DatasetIcon,
  ApiIcon,
  ConceptIcon,
  InfomodIcon,
  PublicServiceIcon
};
