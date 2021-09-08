import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const TextField = styled('div')`
  display: flex;
`;

const SearchButton = styled('button')`
  display: flex;
  background: ${theme.colour(Colour.NEUTRAL, 'N60')};
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  border-radius: 0 5px 5px 0;
  align-items: center;
  appearance: none;
  border: none;
  outline: none;
  font-weight: ${theme.fontWeight('FW500')};
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  padding: ${theme.spacing('S8')} ${theme.spacing('S16')};
  margin-right: -10px;

  &:hover,
  &:focus {
    background: ${theme.colour(Colour.NEUTRAL, 'N70')};
  }

  &:disabled {
    cursor: default;
    pointer-events: none;
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
    background: ${theme.colour(Colour.NEUTRAL, 'N30')};
  }
`;

const Input = styled('input')`
  flex: 1 0 auto;
  padding: ${theme.spacing('S8')};
  border: 1px solid;
  border-radius: 5px 0 0 5px;

  &:focus {
    outline: none;
  }

  &:placeholder-shown + button + button {
    opacity: 0;
    pointer-events: none;
  }
`;

const ClearButton = styled('button')`
  position: relative;
  right: 70px;
  cursor: pointer;
  background: inherit;
  border: none;
`;

export default { TextField, Input, ClearButton, SearchButton };
