import styled from 'styled-components';
import { Unit, theme } from '@fellesdatakatalog/theme';

const BidirTitle = styled.p`
  margin-top: ${theme.spacing('S8')};
  padding-bottom: ${theme.spacing('S4')};
  line-height: ${theme.spacing('S16', Unit.REM)};

  & > svg {
    align-self: start;
    width: 16px;
    margin-right: ${theme.spacing('S8')};
  }
`;

export default { BidirTitle };
