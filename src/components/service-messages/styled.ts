import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';
import AlertBase from '@fellesdatakatalog/alert';
import LinkBase from '@fellesdatakatalog/link';

const ServiceMessages = styled.div`
  display: flex;
  flex-flow: column;
`;

const Alert = styled(AlertBase)`
  align-items: flex-start;
  margin-bottom: ${theme.spacing('S10')};
  padding: ${theme.spacing('S24')};
`;

const Content = styled.div`
  display: flex;
  flex-flow: column;
  margin-left: 0.5em;
`;

const Title = styled.div`
  font-weight: ${theme.fontWeight('FW500')};
  margin-bottom: ${theme.spacing('S6')};
`;

const Description = styled.div`
  align-items: baseline;
  display: flex;
`;

const Link = styled(LinkBase)`
  display: flex;
  margin-left: 0.2em;
`;

export default {
  ServiceMessages,
  Alert,
  Content,
  Title,
  Description,
  Link
};
