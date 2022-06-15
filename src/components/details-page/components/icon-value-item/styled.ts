import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';

const IconValueItem = styled.div`
  align-items: start;
  display: flex;
  gap: ${theme.spacing('S10')};
`;

const Icon = styled.div`
  border-radius: 50%;
  background-color: ${({ theme: t }) => t.entityColours.light};
  padding: 10px;
  & > svg {
    width: 20px;
    & > path {
      fill: ${({ theme: t }) => t.entityColours.dark};
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  color: ${theme.colour(Colour.NEUTRAL, 'N50')};
  font-size: ${theme.fontSize('FS14')};
`;

const Value = styled.span``;

export default { IconValueItem, Icon, Content, Title, Value };
