import styled from 'styled-components';
import { theme as fdkTheme } from '@fellesdatakatalog/theme';

const ListItem = styled.li`
  display: flex;
  padding: 10px 0;
  word-break: break-word;

  &:nth-of-type(n + 2) {
    border-top: 1px solid #dfe1e2;
  }
`;

const Property = styled.div`
  flex-basis: 40%;
  color: ${({ theme }) => theme.extendedColors.textDefault};
  margin-right: ${fdkTheme.spacing('S10')};
`;

const Value = styled.div`
  width: 60%;
`;

export default { ListItem, Property, Value };
