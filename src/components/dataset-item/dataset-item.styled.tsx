import styled from 'styled-components';
import { theme, Unit } from '@fellesdatakatalog/theme';

const Dot = styled.p`
  padding: 0 ${theme.spacing('S6')} 0px ${theme.spacing('S6')};
  font-weight: bold;
  font-size: ${theme.fontSize('FS16', Unit.REM)};
`;

const Subtitle = styled.div`
  display: flex;
  flex-direction: row;
  font-size: ${theme.fontSize('FS16', Unit.REM)};
`;

export default {
  Dot,
  Subtitle
};
