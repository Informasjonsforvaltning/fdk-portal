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

  &:hover {
    color: ${theme.colour(Colour.NEUTRAL, 'N0')};
    background-color: ${theme.colour(Colour.NEUTRAL, 'N60')};
  }
`;

export default { LanguagePicker, CheckedIcon, LanguageButton };
