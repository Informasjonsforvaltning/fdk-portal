import styled from 'styled-components';

import AllIconBase from '../../../../../images/icon-catalog-all-md.svg';
import DatasetIconBase from '../../../../../images/icon-catalog-dataset-md.svg';
import ApiIconBase from '../../../../../images/icon-catalog-api-md.svg';
import ConceptIconBase from '../../../../../images/icon-catalog-concept-md.svg';
import InfomodIconBase from '../../../../../images/icon-catalog-infomod-md.svg';

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

const AllIcon = styled(AllIconBase)`
  height: 1.5em;
  @media (min-width: 768px) {
    height: 1em;
  }
`;

const DatasetIcon = styled(DatasetIconBase)`
  border-radius: 50%;
  padding: 0.5em;
  background-color: ${({ theme }) => theme.colors.dataset.light};
  height: 3em;
  fill: ${({ theme }) => theme.colors.dataset.dark};

  @media (min-width: 768px) {
    height: 2em;
  }
`;

const ApiIcon = styled(ApiIconBase)`
  border-radius: 50%;
  padding: 0.5em;
  background-color: ${({ theme }) => theme.colors.api.light};
  height: 3em;
  fill: ${({ theme }) => theme.colors.api.dark};

  @media (min-width: 768px) {
    height: 2em;
  }
`;

const ConceptIcon = styled(ConceptIconBase)`
  border-radius: 50%;
  padding: 0.5em;
  background-color: ${({ theme }) => theme.colors.concept.light};
  height: 3em;
  fill: ${({ theme }) => theme.colors.concept.dark};

  @media (min-width: 768px) {
    height: 2em;
  }
`;

const InfomodIcon = styled(InfomodIconBase)`
  border-radius: 50%;
  padding: 0.5em;
  background-color: ${({ theme }) => theme.colors.infomod.light};
  height: 3em;
  fill: ${({ theme }) => theme.colors.infomod.dark};

  @media (min-width: 768px) {
    height: 2em;
  }
`;

export default {
  Tabs,
  Label,
  AllIcon,
  DatasetIcon,
  ApiIcon,
  ConceptIcon,
  InfomodIcon
};
