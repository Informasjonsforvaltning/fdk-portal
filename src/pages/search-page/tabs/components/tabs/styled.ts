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
  flex-wrap: wrap;
  margin-bottom: 0;
  padding-left: 0;
  @media (max-width: 768px) {
    justify-content: space-around;
    margin: 0 10%;
  }
`;

const Label = styled.span`
  margin-left: 0.5em;
  @media (max-width: 768px) {
    display: none;
    margin-left: 0;
  }
`;

const MobileLabel = styled.div`
  background-color: #eeeff0;
  display: flex;
  justify-content: center;
  font-size: 2rem;
  padding-top: 1em;
  @media (min-width: 768px) {
    display: none;
  }
`;

const AllIcon = styled(AllIconBase)`
  height: 1.5em;
`;

const DatasetIcon = styled(DatasetIconBase)`
  border-radius: 50%;
  padding: 0.4em;
  background-color: ${({ theme }) => theme.colors.dataset.light};
  height: 2em;
  fill: ${({ theme }) => theme.colors.dataset.dark};
`;

const ApiIcon = styled(ApiIconBase)`
  border-radius: 50%;
  padding: 0.4em;
  background-color: ${({ theme }) => theme.colors.api.light};
  height: 2em;
  fill: ${({ theme }) => theme.colors.api.dark};
`;

const ConceptIcon = styled(ConceptIconBase)`
  border-radius: 50%;
  padding: 0.4em;
  background-color: ${({ theme }) => theme.colors.concept.light};
  height: 2em;
  fill: ${({ theme }) => theme.colors.concept.dark};
`;

const InfomodIcon = styled(InfomodIconBase)`
  border-radius: 50%;
  padding: 0.4em;
  background-color: ${({ theme }) => theme.colors.infomod.light};
  height: 2em;
  fill: ${({ theme }) => theme.colors.infomod.dark};
`;

export default {
  Tabs,
  Label,
  MobileLabel,
  AllIcon,
  DatasetIcon,
  ApiIcon,
  ConceptIcon,
  InfomodIcon
};
