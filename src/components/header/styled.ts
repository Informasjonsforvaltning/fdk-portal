import styled from 'styled-components';
import { Colour, theme as themeFdk } from '@fellesdatakatalog/theme';

const Header = styled.div`
  border-bottom: 1px solid ${themeFdk.colour(Colour.NEUTRAL, 'N30')};
`;

export default {
  Header
};
