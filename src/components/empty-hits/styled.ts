import { Unit, theme } from '@fellesdatakatalog/theme';
import styled from 'styled-components';

const Content = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column;
  font-size: ${theme.fontSize('FS16', Unit.REM)};
  justify-content: center;
  text-align: center;
`;

const Header = styled.div`
  font-size: ${theme.fontSize('FS12', Unit.EM)};
  font-weight: 500;
  margin-bottom: 1em;
`;

export default {
  Content,
  Header
};
