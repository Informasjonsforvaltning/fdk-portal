import styled from 'styled-components';
import LinkBase from '@fellesdatakatalog/link';
import { theme, Colour, Unit } from '@fellesdatakatalog/theme';

const ContainerFooter = styled(LinkBase)`
  font-style: normal;
  font-weight: ${theme.fontWeight('FW400')};
  font-size: ${theme.fontSize('FS16', Unit.REM)};
  padding-left: ${theme.spacing('S10')};
  margin-bottom: ${theme.spacing('S10')};
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  font-family: ${theme.fontFamily()};
`;

export default { ContainerFooter };
