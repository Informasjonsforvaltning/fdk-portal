import { css } from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

export default css`
  html,
  body {
    height: 100%;
  }

  body,
  #root {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
  }

  body {
    background: ${theme.colour(Colour.NEUTRAL, 'N15')};
  }

  * {
    color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  }

  *:focus {
    outline-offset: 3px;
    outline: 2px solid orange;
  }

  footer {
    margin-top: ${theme.spacing('S56')};

    &,
    & * {
      color: ${theme.colour(Colour.NEUTRAL, 'N0')};
    }
  }
`;
