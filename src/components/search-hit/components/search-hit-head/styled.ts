import styled from 'styled-components';
import { Unit, theme as themeFDK } from '@fellesdatakatalog/theme';
import DatasetIconBase from '../../../../images/icon-catalog-dataset-lg.svg';
import ApiIconBase from '../../../../images/icon-catalog-api-lg.svg';
import ConceptIconBase from '../../../../images/icon-catalog-concept-lg.svg';
import InfomodIconBase from '../../../../images/icon-catalog-infomod-lg.svg';
import AuthoritativeIconBase from '../../../../images/icon-authoritative-md.svg';
import ServiceIconBase from '../../../../images/icon-catalog-service-lg.svg';
import type { InvertedColorProps } from '../../../../types';

const Head = styled.div<InvertedColorProps>`
    background-color:  ${({ theme, inverted }) =>
      inverted ? theme.dark : theme.light};
    border-radius: 5px;
    color:  ${({ theme, inverted }) => (inverted ? theme.light : theme.dark)};
    display: flex;
    padding: .5em;
    margin-bottom: 1em;
    
    a {
      color:  ${({ theme, inverted }) =>
        inverted ? theme.light : theme.dark} !important;
    }
    svg > path {
      fill:  ${({ theme, inverted }) => (inverted ? theme.light : theme.dark)};
    }
  }
`;

const HeadTypeIndicator = styled.div`
  display: flex;
  align-items: center;
`;

const HeadInformation = styled.div`
  margin-left: 1em;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  font-size: ${themeFDK.fontSize('FS24', Unit.REM)};
  font-weight: 600;
  margin-bottom: 0;
`;

const Type = styled.div`
  font-size: ${themeFDK.fontSize('FS16', Unit.REM)};
`;

const DatasetIcon = styled(DatasetIconBase)`
  height: 3em;
`;

const ApiIcon = styled(ApiIconBase)`
  height: 3em;
`;

const ConceptIcon = styled(ConceptIconBase)`
  height: 3em;
`;

const InfomodIcon = styled(InfomodIconBase)`
  height: 3em;
`;

const AuthoritativeIcon = styled(AuthoritativeIconBase)`
  margin-left: 0.5em;
  width: 1.2em;
`;

const ServiceIcon = styled(ServiceIconBase)`
  height: 3em;
`;

export default {
  Head,
  HeadTypeIndicator,
  HeadInformation,
  Header,
  Title,
  Type,
  DatasetIcon,
  ApiIcon,
  ConceptIcon,
  InfomodIcon,
  AuthoritativeIcon,
  ServiceIcon
};
