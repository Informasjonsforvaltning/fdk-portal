import { css } from 'styled-components';

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
`;
