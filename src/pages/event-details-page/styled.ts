import styled from 'styled-components';
import { theme, Colour, Unit } from '@fellesdatakatalog/theme';

const BetaRibbon = styled.span`
  position: absolute;
  top: 90px;
  right: -33px;
  transform: rotate(45deg);
  padding: ${theme.spacing('S6')} ${theme.spacing('S40')};
  font-size: ${theme.fontSize('FS20', Unit.REM)};
  font-weight: ${theme.fontWeight('FW700')};
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  background: ${theme.colour(Colour.YELLOW, 'Y30')};
`;

const ListItemValue = styled.div`
  margin-bottom: ${theme.spacing('S10')};
`;

const LightWeightLabel = styled.span`
  font-weight: ${theme.fontWeight('FW400')};
`;

export default {
  BetaRibbon,
  ListItemValue,
  LightWeightLabel
};
