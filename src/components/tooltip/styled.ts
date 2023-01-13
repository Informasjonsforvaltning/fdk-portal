import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import { Unit, theme } from '@fellesdatakatalog/theme';

const ReactTooltipStyled = styled(ReactTooltip)`
  font-size: ${theme.fontSize('FS20', Unit.REM)};
  font-weight: 400;
  line-height: 1.5em;
  padding: 1.5em;
  &.type-dark.place-top {
    background-color: #121619;

    & > span {
      text-align: left;
    }

    &:after {
      border-top-color: #121619;
    }

    &.show {
      opacity: 1;
    }
  }
`;

export default { ReactTooltipStyled };
