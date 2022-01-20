import styled from 'styled-components';
import Link from '@fellesdatakatalog/link';
import AlertBase from '@fellesdatakatalog/alert';

import { theme } from '@fellesdatakatalog/theme';

const ServiceMessagesPage = styled.article`
  margin-top: ${theme.spacing('S24')};
`;

const Title = styled.h1`
  font-size: ${theme.fontSize('FS32')};
  margin-bottom: ${theme.spacing('S24')};
`;

const ServiceMessage = styled(AlertBase)`
  align-items: flex-start;
  margin-top: ${theme.spacing('S12')};
  margin-bottom: ${theme.spacing('S12')};
`;

const Content = styled.div`
  display: flex;
  flex-flow: column;
  margin-left: 0.5em;
`;

const ServiceMessageTitle = styled(Link)`
  font-size: ${theme.fontSize('FS16')};
  margin-bottom: ${theme.spacing('S12')};
`;

const Date = styled.div`
  margin-bottom: ${theme.spacing('S12')};
`;

const Button = styled.button`
  border: 0;
  &:hover {
    cursor: pointer;
  }
`;

const NoMessages = styled.div`
  margin-bottom: ${theme.spacing('S24')};
`;

export default {
  Button,
  ServiceMessagesPage,
  Content,
  Title,
  Date,
  ServiceMessage,
  ServiceMessageTitle,
  NoMessages
};
