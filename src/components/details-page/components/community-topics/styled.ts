import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';

const Notice = styled.div`
  background-color: ${theme.colour(Colour.NEUTRAL, 'N10')};
  border-left: 4px solid ${theme.colour(Colour.BLUE, 'B45')};
  border-radius: 5px;
  margin-top: ${theme.spacing('S24')};
  padding: ${theme.spacing('S16')} ${theme.spacing('S24')};
`;

const NoticeTitle = styled.h3`
  font-size: ${theme.fontSize('FS16')};
  font-weight: 600;
  margin-bottom: ${theme.spacing('S8')};
`;

const NoticeBody = styled.p`
  margin-bottom: ${theme.spacing('S16')};
`;

const NoticeLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing('S24')};
`;

export default { Notice, NoticeTitle, NoticeBody, NoticeLinks };
