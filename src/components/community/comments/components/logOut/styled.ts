import { theme } from '@fellesdatakatalog/theme';
import styled from 'styled-components';

import Buttons from '../buttons/styled';

const LogOutContainer = styled.span`
  display: flex;
  white-space: pre;
  align-items: center;
  & > ${Buttons.UnderlineButton} {
    margin-left: ${theme.spacing('S8')};
  }
`;

export default {
  LogOutContainer
};
