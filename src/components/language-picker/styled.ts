import styled from 'styled-components';
import { Colour, theme } from '@fellesdatakatalog/theme';
import Button from '@fellesdatakatalog/button';

import CheckedIconBase from '../../images/icon-checked-white-sm.svg';

interface ButtonProps {
  selected?: boolean;
}

const LanguagePicker = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${theme.spacing('S24')};

  @media (max-width: 900px) {
    & {
      align-items: stretch;
      flex-flow: column;

      & > button {
        margin-bottom: ${theme.spacing('S8')};
      }
    }
  }
`;

const CheckedIcon = styled(CheckedIconBase)`
  height: 18px;
  width: 18px;
  margin-right: 5px;
`;

const LanguageButton = styled(Button)<ButtonProps>`
  border-radius: 0;
  justify-content: center;

  color: ${({ selected }) =>
    selected
      ? theme.colour(Colour.NEUTRAL, 'N0')
      : ({ theme }) => theme.entityColours.dark};

  background-color: ${({ selected }) =>
    selected
      ? theme.colour(Colour.NEUTRAL, 'N60')
      : ({ theme }) => theme.entityColours.light};

  box-shadow: ${({ selected }) =>
    selected
      ? 'none'
      : '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)'};

  &:hover {
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
    background-color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  }
`;

export default { LanguagePicker, CheckedIcon, LanguageButton };
