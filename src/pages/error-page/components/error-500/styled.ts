import styled from 'styled-components';
import { theme, Colour, Unit } from '@fellesdatakatalog/theme';
import LinkBase from '@fellesdatakatalog/link';

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
    font-size: ${theme.fontSize('FS40', Unit.REM)};
    font-weight: ${theme.fontWeight('FW800')};
    color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  }

  & p {
    font-size: ${theme.fontSize('FS20', Unit.REM)};
    display: inline;
  }

  & span {
    max-width: 1140px;

  & a {
    text-decoration: underline;
    color: ${theme.colour(Colour.NEUTRAL, 'N60')};
    font-size: ${theme.fontSize('FS20', Unit.REM)};
    margin-left: ${theme.spacing('S4')};
    margin-right: ${theme.spacing('S4')};
  }
`;

const Link = styled(LinkBase)`
  & > div {
    border: none;
    display: block;
    padding: 0;
    text-decoration: underline;

    & > svg {
      margin-left: 0.3rem;
    }
  }
`;

export default { Error500, Link };
