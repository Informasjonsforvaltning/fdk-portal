import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const Tag = styled.span`
  padding: 0px 10px;
  background-color: ${theme.colour(Colour.NEUTRAL, 'N15')};
  border-radius: 20px;
  font-weight: ${theme.fontWeight('FW400')};
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};

  &:hover {
    background-color: ${theme.colour(Colour.NEUTRAL, 'N60')};
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
    text-decoration: none;
  }
`;

export default { Tag };
