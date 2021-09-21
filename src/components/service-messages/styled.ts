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

  & > svg {
    flex: 0 0 20px;
  }
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
  flex-wrap: wrap;
`;

const Text = styled.span`
  margin-bottom: 0.2em;
  margin-right: 0.2em;
`;

const Link = styled(LinkBase)`
  display: flex;
`;

export default {
  ServiceMessages,
  Alert,
  Content,
  Title,
  Description,
  Text,
  Link
};
