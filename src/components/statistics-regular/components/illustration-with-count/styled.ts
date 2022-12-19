import styled, { css } from 'styled-components';

import { Variant } from './enums';

const Icon = styled.figure`
  align-items: center;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  background-color: ${({ theme }) =>
    theme.light ?? theme.extendedColors.neutralLight};
  display: flex;
  justify-content: center;

  & > svg {
    width: 65%;
    & > * {
      stroke: ${({ theme }) => theme.dark};
    }
  }
`;

const Chart = styled.figure`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 110px;

  & > svg {
    & > * {
      stroke: ${({ theme }) => theme.dark};
    }
  }
`;

const Count = styled.span`
  color: ${({ theme }) => theme.dark ?? theme.extendedColors.neutralDarker};
  font-size: 2em;
  font-weight: 600;
  margin-left: 0.2em;
`;

const Content = styled.div<{ variant?: Variant }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5em 0;

  ${({ variant }) => {
    switch (variant) {
      case Variant.COLUMN:
        return css`
          flex-flow: column;
        `;
      default:
        return css``;
    }
  }}
`;

export default { Icon, Chart, Count, Content };
