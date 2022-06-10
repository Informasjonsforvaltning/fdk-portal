import styled, { css } from 'styled-components';
import { Colour, theme, Unit } from '@fellesdatakatalog/theme';

import DatasetIconBase from '../../../../images/icon-catalog-dataset-lg.svg';
import ApiIconBase from '../../../../images/icon-catalog-api-lg.svg';
import ConceptIconBase from '../../../../images/icon-catalog-concept-lg.svg';
import InfomodIconBase from '../../../../images/icon-catalog-infomod-lg.svg';
import ServiceIconBase from '../../../../images/icon-catalog-service-lg.svg';

interface Props {
  boxStyle?: boolean;
}

const ContentSection = styled.section<Props>`
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
  font-weight: 600;
`;

const Header = styled.div`
  align-items: center;
  border-bottom: 1px solid ${({ theme: t }) => t.entityColours.light};
  display: flex;
  margin-bottom: ${theme.spacing('S10')};
  padding-bottom: ${theme.spacing('S10')};
`;

const IconPlaceholder = styled.div`
  border-radius: 50%;
  background-color: ${({ theme: t }) => t.entityColours.light};
  margin-right: ${theme.spacing('S16')};
  padding: ${theme.spacing('S10', Unit.PX)}; ;
`;

const iconStyle = css`
  height: 20px;

  & > path {
    fill: ${({ theme: t }) => t.entityColours.dark};
  }
`;

const DatasetIcon = styled(DatasetIconBase)`
  ${iconStyle}
`;

const ApiIcon = styled(ApiIconBase)`
  ${iconStyle}
`;

const ConceptIcon = styled(ConceptIconBase)`
  ${iconStyle}
`;

const InfomodIcon = styled(InfomodIconBase)`
  ${iconStyle}
`;

const ServiceIcon = styled(ServiceIconBase)`
  ${iconStyle}
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
