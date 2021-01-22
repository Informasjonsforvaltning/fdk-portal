import styled, { css } from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

import DatasetIconBase from '../../../../images/icon-catalog-dataset-lg.svg';
import ApiIconBase from '../../../../images/icon-catalog-api-lg.svg';
import ConceptIconBase from '../../../../images/icon-catalog-concept-lg.svg';
import InfomodIconBase from '../../../../images/icon-catalog-infomod-lg.svg';
import ServiceIconBase from '../../../../images/icon-catalog-service-lg.svg';

interface Props {
  boxStyle?: boolean;
}

const ContentSection = styled.section<Props>`
  &:nth-of-type(n + 2) {
    margin-top: 50px;
  }

  ${({ boxStyle }) =>
    boxStyle &&
    css`
      background-color: ${theme.colour(Colour.NEUTRAL, 'N0')};
      border-radius: 5px;
      padding: ${theme.spacing('S32')};
    `}
`;

const Title = styled.h2`
  flex-grow: 1;
  font-size: 32px;
  font-weight: 600;
`;

const Header = styled.div`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.entityColours.light};
  display: flex;
  margin-bottom: ${theme.spacing('S10')};
  padding: ${theme.spacing('S10')} 0;
`;

const IconPlaceholder = styled.div`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.entityColours.light};
  margin-right: ${theme.spacing('S16')};
  padding: ${theme.spacing('S6')}; ;
`;

const DatasetIcon = styled(DatasetIconBase)`
  height: 2em;

  & > path {
    fill: ${({ theme }) => theme.entityColours.dark};
  }
`;

const ApiIcon = styled(ApiIconBase)`
  height: 2em;

  & > path {
    fill: ${({ theme }) => theme.entityColours.dark};
  }
`;

const ConceptIcon = styled(ConceptIconBase)`
  height: 2em;

  & > path {
    fill: ${({ theme }) => theme.entityColours.dark};
  }
`;

const InfomodIcon = styled(InfomodIconBase)`
  height: 2em;

  & > path {
    fill: ${({ theme }) => theme.entityColours.dark};
  }
`;

const ServiceIcon = styled(ServiceIconBase)`
  height: 2em;

  & > path {
    fill: ${({ theme }) => theme.entityColours.dark};
  }
`;

export default {
  ContentSection,
  Title,
  Header,
  IconPlaceholder,
  DatasetIcon,
  ApiIcon,
  ConceptIcon,
  InfomodIcon,
  ServiceIcon
};
