import styled, { css } from 'styled-components';

import { theme } from '@fellesdatakatalog/theme';

interface Props {
  $useBorder?: boolean;
}

const List = styled.ul<Props>`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing('S12')};
  list-style: none;
  ${({ $useBorder }) =>
    $useBorder &&
    css`
      & > li:nth-of-type(n + 2) {
        border-top: 1px solid rgb(223, 225, 226);
      }
    `}
`;

export default { List };
