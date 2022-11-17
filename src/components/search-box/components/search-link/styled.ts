import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { theme, Colour } from '@fellesdatakatalog/theme';

import DatasetIconBase from '../../../../images/icon-catalog-dataset-lg.svg';
import ApiIconBase from '../../../../images/icon-catalog-api-lg.svg';
import ConceptIconBase from '../../../../images/icon-catalog-concept-lg.svg';
import InfomodIconBase from '../../../../images/icon-catalog-infomod-lg.svg';
import PublicServiceIconBase from '../../../../images/icon-catalog-service-lg.svg';
import { Entity } from '../../../../types/enums';

const SearchLink = styled(Link)<{
  type?: Entity;
  $smallWidth?: boolean;
  title: string;
}>`
  align-items: center;
  background-color: ${({ type, theme: t }) =>
    type ? t.extendedColors[type]?.light : '#FFF'};
  border-radius: 5px;
  color: ${({ theme: t }) => t.extendedColors.neutralDarker} !important;
  display: flex;
  font-size: 1.8rem;
  margin-bottom: 1em;
  padding: 1em;
  position: relative;
  text-decoration: none;
  word-break: break-all;
  transition: all 200ms ease-in-out;
  white-space: nowrap;
  overflow: hidden;

  svg {
    path {
      fill: ${({ type, theme: t }) =>
        type ? t.extendedColors[type]?.dark : '#121619'};
    }
  }

  span:last-child {
    font-weight: 500;
    margin-left: 0.2em;
    text-align: center;
  }

  @media (min-width: 992px) {
    justify-content: center;
    flex-flow: column;
    font-size: 1.6rem;

    ${({ $smallWidth }) => {
      if ($smallWidth) {
        return css`
          width: 19%;
        `;
      }

      return css`
        width: 23%;
      `;
    }}
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

const BetaRibbon = styled.span`
  position: absolute;
  top: 8px;
  right: -33px;
  transform: rotate(45deg);
  padding: ${theme.spacing('S6')} ${theme.spacing('S40')};
  font-size: ${theme.fontSize('FS20')};
  font-weight: ${theme.fontWeight('FW700')};
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  background: ${theme.colour(Colour.YELLOW, 'Y30')};
`;

export default {
  SearchLink,
  DatasetIcon,
  ApiIcon,
  ConceptIcon,
  InfomodIcon,
  PublicServiceIcon,
  BetaRibbon
};
