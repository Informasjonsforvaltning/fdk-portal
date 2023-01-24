import styled from 'styled-components';
import { theme, Unit } from '@fellesdatakatalog/theme';

const ServiceMessagePage = styled.article`
  display: flex;
  flex-flow: column;
  font-size: ${theme.fontSize('FS12', Unit.REM)};
  margin-top: ${theme.spacing('S32')};
  word-wrap: break-word;
  & p {
    margin-bottom: ${theme.spacing('S24')};
  }

  & a > p {
    margin-bottom: 0;
  }
`;

const ServiceMessage = styled.div`
  display: flex;
`;

const Title = styled.h1`
  font-size: ${theme.fontSize('FS32', Unit.EM)};
  font-weight: ${theme.fontWeight('FW700')};
  margin-bottom: ${theme.spacing('S16')};
`;

const Description = styled.div`
  font-size: ${theme.fontSize('FS20', Unit.EM)};
  line-height: 1.6;
  margin-bottom: ${theme.spacing('S24')};
`;

const Body = styled.div`
  font-size: ${theme.fontSize('FS16', Unit.REM)};
`;

export default { ServiceMessagePage, ServiceMessage, Title, Description, Body };
