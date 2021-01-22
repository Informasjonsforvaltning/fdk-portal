import styled from 'styled-components';
import { theme } from '@fellesdatakatalog/theme';

const BidirTitle = styled.p`
  margin-top: ${theme.spacing('S8')};
  padding-bottom: ${theme.spacing('S4')};

  & > svg {
    align-self: start;
    width: 16px;
    margin-right: ${theme.spacing('S8')};
  }
`;

export default { BidirTitle };
