import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const Error500 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: ${theme.spacing('S16')};

  & > svg {
    height: 200px;
    width: 200px;
    margin: ${theme.spacing('S16')};
  }

  & > h1 {
    margin: ${theme.spacing('S16')};
    font-size: ${theme.fontSize('FS40')};
    font-weight: ${theme.fontWeight('FW800')};
    color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  }

  & > p {
    font-size: ${theme.fontSize('FS20')};
  }
`;

export default { Error500 };
