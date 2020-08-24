import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import IllustrationSC from '../illustration-with-count/styled';

import { Variant } from './enums';

const Label = styled.span<{ variant?: Variant }>`
  color: ${({ theme }) => theme.dark};
  text-align: center;

  ${({ variant }) => {
    switch (variant) {
      case Variant.LARGE:
        return css`
          font-size: 1.4em;
        `;
      case Variant.XLARGESTRONG:
        return css`
          font-size: 2em;
          font-weight: 600;
        `;
      default:
        return css`
          font-size: 1em;
        `;
    }
  }}
`;

const StatisticsRegular = styled(Link)`
  align-items: center;
  color: ${({ theme }) => theme.dark};
  cursor: pointer;
  display: flex;
  flex-flow: column;
  font-size: 1.6rem;
  margin: 0.5em;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.extendedColors.neutralDarker};
    text-decoration: none;

    ${IllustrationSC.Icon} {
      background-color: ${({ theme }) => theme.extendedColors.neutralDarker};
      & > svg {
        fill: white;

        & > path {
          fill: white;
        }
      }
    }

    ${IllustrationSC.Count} {
      color: ${({ theme }) => theme.extendedColors.neutralDarker};
      text-decoration: underline;
    }

    ${Label} {
      color: ${({ theme }) => theme.extendedColors.neutralDarker};
    }
  }
`;

export default { StatisticsRegular, Label };