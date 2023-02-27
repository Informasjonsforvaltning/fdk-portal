import styled, { css } from 'styled-components';

import CheckIconBase from '@fellesdatakatalog/icons/assets/svg/check-stroke.svg';
import { Colour, theme as themeFdk } from '@fellesdatakatalog/theme';

const CheckIcon = styled(CheckIconBase)`
  width: 16px;
  height: 16px;
  margin-right: 0.5em;
  & * {
    stroke: ${themeFdk.colour(Colour.NEUTRAL, 'N0')};
  }
`;

const ButtonToggle = styled.button<{
  selected?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
}>`
  background-color: ${({ theme }) => theme.extendedColors.neutralLight};
  border: none;
  padding: 0.5em;

  &:focus {
    outline-offset: 3px;
    outline: 2px solid orange;
  }

  ${({ borderLeft }) =>
    borderLeft &&
    css`
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    `}

  ${({ borderRight }) =>
    borderRight &&
    css`
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    `}    
    
    ${({ selected }) =>
    selected
      ? css`
          background-color: ${({ theme }) =>
            theme.extendedColors.neutralDarker};
          box-shadow: 0 4px 8px rgba(45, 55, 65, 0.2);
          color: #fff;
        `
      : css`
          cursor: pointer;
        `}
  
    @media (min-width: 992px) {
    min-width: 14em;
  }
`;

export default {
  ButtonToggle,
  CheckIcon
};
