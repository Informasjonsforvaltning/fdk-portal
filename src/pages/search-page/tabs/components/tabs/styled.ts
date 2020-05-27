import styled from 'styled-components';

import AllIconBase from '../../../../../images/icon-catalog-all-md.svg';
import DatasetIconBase from '../../../../../images/icon-catalog-dataset-md.svg';
import ApiIconBase from '../../../../../images/icon-catalog-api-md.svg';
import ConceptIconBase from '../../../../../images/icon-catalog-concept-md.svg';
import InfomodIconBase from '../../../../../images/icon-catalog-infomod-md.svg';

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
  background-color: ${({ type, theme }) =>
    type ? theme.colors[type]?.light : theme.colors.neutralLight};
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
  fill: ${({ theme }) => theme.colors[Entity.DATASET].dark};

  @media (min-width: 768px) {
    height: 2em;
  }
`;

const ApiIcon = styled(ApiIconBase)`
  padding: 0.5em;
  height: 3em;
  fill: ${({ theme }) => theme.colors[Entity.DATA_SERVICE].dark};

  @media (min-width: 768px) {
    height: 2em;
  }
`;

const ConceptIcon = styled(ConceptIconBase)`
  padding: 0.5em;
  height: 3em;
  fill: ${({ theme }) => theme.colors[Entity.CONCEPT].dark};

  @media (min-width: 768px) {
    height: 2em;
  }
`;

const InfomodIcon = styled(InfomodIconBase)`
  padding: 0.5em;
  height: 3em;
  fill: ${({ theme }) => theme.colors[Entity.INFORMATION_MODEL].dark};

  @media (min-width: 768px) {
    height: 2em;
  }
`;

export default {
  Tabs,
  Label,
  IconPlaceholder,
  AllIcon,
  DatasetIcon,
  ApiIcon,
  ConceptIcon,
  InfomodIcon
};
