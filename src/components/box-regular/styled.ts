import styled, { css } from 'styled-components';
import { Unit, theme } from '@fellesdatakatalog/theme';
import { Variant } from '../statistics-regular/components/illustration-with-count/enums';

const BoxRegular = styled.div`
  align-items: center;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-flow: column;
  font-size: ${theme.fontSize('FS16', Unit.REM)};
  justify-content: center;
  margin: 0.3em 0;
  padding: 2em;
`;

const BoxHeader = styled.h3`
  font-size: 1.5em;
  font-weight: 600;
  margin-bottom: 1em;
`;

const BoxSubHeader = styled.h4`
  font-size: 1.2em;
  font-weight: 400;
  margin-bottom: 1em;
`;

const BoxContent = styled.div<{ variant?: Variant }>`
  align-items: center;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  width: 100%;

  & > svg {
    width: 50%;
  }

  @media (min-width: 992px) {
    & > div {
      display: flex;
    }

    ${({ variant }) => {
      switch (variant) {
        case Variant.COLUMN:
          return css`
            align-items: center;
            flex-flow: column;
          `;
        default:
          return css`
            align-items: flex-start;
            flex-flow: row;
            flex-wrap: wrap;
          `;
      }
    }}
  }
`;

const BoxColumn = styled.div`
  display: flex;
  flex-flow: column;
`;

export default {
  BoxRegular,
  BoxHeader,
  BoxSubHeader,
  BoxContent,
  BoxColumn
};
