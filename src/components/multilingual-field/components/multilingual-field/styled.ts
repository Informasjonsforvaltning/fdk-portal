import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

const MultiLingualField = styled.div`
  display: flex;
  flex-direction: column;
`;

const LanguageField = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 0.5em;
`;

const LanguageIndicator = styled.span`
  background-color: ${({ theme: t }) => t.entityColours.light};
  border-radius: 5px;
  color: ${({ theme: t }) => t.entityColours.dark};
  font-weight: ${theme.fontWeight('FW700')};
  padding: 0.1em 0.3em;
  margin-right: 0.5em;
  white-space: nowrap;
`;

export default { MultiLingualField, LanguageField, LanguageIndicator };
