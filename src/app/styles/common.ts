import { css } from 'styled-components';

import { Entity } from '../../types/enums';

export default css`
  html,
  body {
    height: 100%;
  }

  body,
  #root,
  #root > div {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
  }

  #root > div {
    &.${Entity.DATASET} {
      background: ${({ theme }) => theme.colors[Entity.DATASET].lighter};
    }

    &.${Entity.DATA_SERVICE} {
      background: ${({ theme }) => theme.colors[Entity.DATA_SERVICE].lighter};
    }

    &.${Entity.CONCEPT} {
      background: ${({ theme }) => theme.colors[Entity.CONCEPT].lighter};
    }

    &.${Entity.INFORMATION_MODEL} {
      background: ${({ theme }) =>
        theme.colors[Entity.INFORMATION_MODEL].lighter};
    }
  }
`;
