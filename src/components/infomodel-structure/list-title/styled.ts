import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const ListTitle = styled.h6`
  margin-top: ${theme.spacing('S24')};
  padding-bottom: ${theme.spacing('S8')};
  border-bottom: 1px solid ${theme.colour(Colour.VIOLET, 'V30')};
  font-weight: ${theme.fontWeight('FW700')};
`;

export default { ListTitle };
