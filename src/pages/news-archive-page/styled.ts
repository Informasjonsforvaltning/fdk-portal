import { Unit, theme } from '@fellesdatakatalog/theme';
import styled from 'styled-components';

const Header = styled.h1`
  font-size: ${theme.fontSize('FS40', Unit.REM)};
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 2em;

  @media (min-width: 992px) {
    flex-flow: row;
    flex-wrap: wrap;
    margin-top: 4em;
  }

  & > article {
    @media (min-width: 992px) {
      margin-bottom: 4em;
      width: 30%;
      margin-right: 3%;
    }
  }
`;

export default { Header, Content };
