import { Unit, theme } from '@fellesdatakatalog/theme';
import styled, { css } from 'styled-components';

const SearchBoxHeader = styled.h1<{ large?: boolean }>`
  font-size: ${theme.fontSize('FS14', Unit.EM)};
  font-weight: 500;

  ${({ large }) =>
    large &&
    css`
      font-size: ${theme.fontSize('FS20', Unit.EM)};
    `}
`;

export default { SearchBoxHeader };
