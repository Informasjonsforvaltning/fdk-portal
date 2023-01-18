import styled from 'styled-components';
import { theme, Colour, Unit } from '@fellesdatakatalog/theme';

const ContainerHeader = styled.h4`
  width: -webkit-fill-available;
  padding: ${theme.spacing('S10')};
  gap: ${theme.spacing('S10')};
  border-radius: 3px;

  background-color: ${theme.colour(Colour.NEUTRAL, 'N15')};
  font-weight: ${theme.fontWeight('FW700')};
  font-size: ${theme.fontSize('FS20', Unit.REM)}
  line-height: ${theme.spacing('S24')};
  font-family: ${theme.fontFamily()};
`;

export default { ContainerHeader };
