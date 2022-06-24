import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const DividerContainer = styled.div`
  padding: 0 ${theme.spacing('S10')};
`;

const Divider = styled.hr`
  border-width: 1px;
  border-color: ${theme.colour(Colour.NEUTRAL, 'N30')};
`;

export default { Divider, DividerContainer };
