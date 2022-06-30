import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const CommunityContainer = styled.div`
  padding: ${theme.spacing('S10')};
  background-color: ${theme.colour(Colour.NEUTRAL, 'N10')};
  border-radius: 4px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-bottom: ${theme.spacing('S10')};
`;

export default { CommunityContainer };
