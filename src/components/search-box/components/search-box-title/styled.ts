import styled, { css } from 'styled-components';

const Title = styled.h1<{ large?: boolean }>`
  font-size: 1.5em;
  font-weight: 500;

  ${({ large }) =>
    large &&
    css`
      font-size: 2em;
    `}
`;

export default { Title };
