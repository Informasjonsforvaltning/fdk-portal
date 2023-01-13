import { Unit, theme } from '@fellesdatakatalog/theme';
import styled from 'styled-components';

const Header = styled.h2`
  font-size: ${theme.fontSize('FS28', Unit.REM)};
  font-weight: 600;
  margin-top: 1em;
  margin-bottom: 0.25em;
  text-align: center;

  @media (min-width: 992px) {
    text-align: left;
  }

  & > a {
    font-size: inherit;
    font-weight: inherit;
    margin: none;

    & svg {
      height: 3rem;
      width: 3rem;
    }
  }
`;

export default {
  Header
};
