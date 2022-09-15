import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const TextField = styled('div')`
  position: relative;
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
  padding: ${theme.spacing('S8')} ${theme.spacing('S24')} ${theme.spacing('S8')}
    ${theme.spacing('S8')};
  border: 1px solid;
  border-radius: 5px;

  &:focus {
    outline: none;
  }

  &:placeholder-shown + button + button {
    opacity: 0;
    pointer-events: none;
  }
`;

const ClearButton = styled('button')`
  position: absolute;
  top: ${theme.spacing('S8')};
  right: ${theme.spacing('S8')};
  cursor: pointer;
  background: inherit;
  border: none;
`;

const Options = styled.ul`
  display: flex;
  flex-direction: column;

  width: calc(100% - 2px);
  box-sizing: content-box;

  position: absolute;
  z-index: 999;
  top: 2.5em;
  margin: auto;
  overflow: hidden;

  border: 1px solid ${({ theme: t }) => t.extendedColors.neutralDarker};
  border-radius: 0px 0px 5px 5px;
  border-top: 0;
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};
`;

const Option = styled.li`
  color: ${({ theme: t }) => t.extendedColors.neutralDarker};
  font-size: ${theme.fontSize('FS16')};
  padding: ${theme.spacing('S8')};
  cursor: pointer;

  &:hover,
  :focus {
    background-color: ${theme.colour(Colour.NEUTRAL, 'N15')};
  }
`;

export default { TextField, Input, ClearButton, SearchButton, Options, Option };
