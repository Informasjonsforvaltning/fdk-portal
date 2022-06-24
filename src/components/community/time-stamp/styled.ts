import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const TimeStamp = styled.div`
  font-family: ${theme.fontFamily()};
  font-style: normal;
  font-weight: ${theme.fontWeight('FW400')};
  font-size: ${theme.fontSize('FS16')};
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  line-height: 24px;
  align-items: center;
  text-align: right;
  margin-top: ${theme.spacing('S10')};
  padding-right: ${theme.spacing('S10')};
`;

export default { TimeStamp };
