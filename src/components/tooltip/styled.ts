import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const ReactTooltipStyled = styled(ReactTooltip)`
  font-weight: 400;
  line-height: 2em;
  &.type-dark.place-top {
    background-color: #121619;

    & > span {
      text-align: left;
    }

    &:after {
      border-top-color: #121619;
    }
  }
`;

export default { ReactTooltipStyled };
