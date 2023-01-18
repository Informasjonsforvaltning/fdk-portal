import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { Unit, theme as themeFDK } from '@fellesdatakatalog/theme';
import IllustrationSC from '../illustration-with-count/styled';

import { Variant } from './enums';

const Label = styled.span<{ variant?: Variant }>`
  color: ${({ theme }) => theme.dark ?? theme.extendedColors.neutralDarker};
  text-align: center;

  ${({ variant }) => {
    switch (variant) {
      case Variant.LARGE:
        return css`
          font-size: ${themeFDK.fontSize('FS14', Unit.EM)};
        `;
      case Variant.XLARGESTRONG:
        return css`
          font-size: ${themeFDK.fontSize('FS20', Unit.EM)};
          font-weight: 600;
        `;
      default:
        return css`
          font-size: ${themeFDK.fontSize('FS12', Unit.EM)};
        `;
    }
  }}
`;

const StatisticsRegular = styled(Link)<{ as?: string }>`
  align-items: center;
  color: ${({ theme }) => theme.dark};
  display: flex;
  flex-flow: column;
  font-size: ${themeFDK.fontSize('FS16', Unit.REM)};
  margin: 0.5em;
  text-decoration: none;

  ${({ as }) =>
    !as &&
    css`
      cursor: pointer;

      &:hover {
        color: ${({ theme }) => theme.extendedColors.neutralDarkest};
        text-decoration: none;

        ${IllustrationSC.Icon} {
          background-color: ${({ theme }) =>
            theme.extendedColors.neutralDarkest};
          & > svg {
            & > * {
              stroke: white;
            }
          }
        }

        ${IllustrationSC.Count} {
          color: ${({ theme }) => theme.extendedColors.neutralDarkest};
          text-decoration: underline;
        }

        ${Label} {
          color: ${({ theme }) => theme.extendedColors.neutralDarkest};
        }
      }
    `}
`;

export default { StatisticsRegular, Label };
