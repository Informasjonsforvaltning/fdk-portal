import styled from 'styled-components';

import { Colour, theme } from '@fellesdatakatalog/theme';
import AllIconBase from '../../../../../images/icon-catalog-all-md.svg';
import DatasetIconBase from '../../../../../images/icon-catalog-dataset-md.svg';
import ApiIconBase from '../../../../../images/icon-catalog-api-md.svg';
import ConceptIconBase from '../../../../../images/icon-catalog-concept-md.svg';
import InfomodIconBase from '../../../../../images/icon-catalog-infomod-md.svg';
import ServiceIconBase from '../../../../../images/icon-catalog-service-md.svg';

import { Entity } from '../../../../../types/enums';

const Tabs = styled.ul`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  margin-bottom: 0;
  padding-left: 0;
  @media (max-width: 768px) {
    justify-content: space-around;
  }
`;

const Label = styled.span`
  margin-left: 0.5em;
  white-space: nowrap;
  @media (max-width: 768px) {
    display: none;
    margin-left: 0;
  }
`;

const IconPlaceholder = styled.div<{ type?: Entity }>`
  border-radius: 50%;
  background-color: ${({ type, theme: t }) =>
    type ? t.extendedColors[type]?.light : t.extendedColors.neutralLight};
`;

const AllIcon = styled(AllIconBase)`
  padding: 0.5em;
  height: 3em;

  @media (min-width: 768px) {
    height: 2em;
  }
`;

const DatasetIcon = styled(DatasetIconBase)`
  padding: 0.5em;
  height: 3em;
  fill: ${({ theme: t }) => t.extendedColors[Entity.DATASET].dark};

  @media (min-width: 768px) {
    height: 2em;
  }
`;

const ApiIcon = styled(ApiIconBase)`
  padding: 0.5em;
  height: 3em;
  fill: ${({ theme: t }) => t.extendedColors[Entity.DATA_SERVICE].dark};

  @media (min-width: 768px) {
    height: 2em;
  }
`;

const ConceptIcon = styled(ConceptIconBase)`
  padding: 0.5em;
  height: 3em;
  fill: ${({ theme: t }) => t.extendedColors[Entity.CONCEPT].dark};

  @media (min-width: 768px) {
    height: 2em;
  }
`;

const InfomodIcon = styled(InfomodIconBase)`
  padding: 0.5em;
  height: 3em;
  fill: ${({ theme: t }) => t.extendedColors[Entity.INFORMATION_MODEL].dark};

  @media (min-width: 768px) {
    height: 2em;
  }
`;

const ServiceIcon = styled(ServiceIconBase)`
  padding: 0.5em;
  height: 3em;
  fill: ${({ theme: t }) => t.extendedColors[Entity.PUBLIC_SERVICE].dark};

  @media (min-width: 768px) {
    height: 2em;
  }
`;

const BetaRibbon = styled.span`
  position: absolute;
  top: 2px;
  right: -40px;
  transform: rotate(45deg);
  padding: ${theme.spacing('S4')} ${theme.spacing('S40')};
  font-size: 1rem;
  font-weight: ${theme.fontWeight('FW700')};
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  background: ${theme.colour(Colour.YELLOW, 'Y30')};
`;

export default {
  Tabs,
  Label,
  IconPlaceholder,
  AllIcon,
  DatasetIcon,
  ApiIcon,
  ConceptIcon,
  InfomodIcon,
  ServiceIcon,
  BetaRibbon
};
