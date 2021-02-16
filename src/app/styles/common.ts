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
      background: ${({ theme }) =>
        theme.extendedColors[Entity.DATASET].lighter};
    }

    &.${Entity.DATA_SERVICE} {
      background: ${({ theme }) =>
        theme.extendedColors[Entity.DATA_SERVICE].lighter};
    }

    &.${Entity.CONCEPT} {
      background: ${({ theme }) =>
        theme.extendedColors[Entity.CONCEPT].lighter};
    }

    &.${Entity.INFORMATION_MODEL} {
      background: ${({ theme }) =>
        theme.extendedColors[Entity.INFORMATION_MODEL].lighter};
    }

    &.${Entity.PUBLIC_SERVICE} {
      background: ${({ theme }) =>
        theme.extendedColors[Entity.PUBLIC_SERVICE].lighter};
    }

    &.${Entity.EVENT} {
      background: ${({ theme }) => theme.extendedColors[Entity.EVENT].lighter};
    }
  }

  footer {
    margin-top: 60px;
  }
`;
