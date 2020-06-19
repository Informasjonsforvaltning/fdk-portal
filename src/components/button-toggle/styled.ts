import styled, { css } from 'styled-components';

const ButtonToggle = styled.button<{
  selected?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
}>`
    background-color: ${({ theme }) => theme.extendedColors.neutralLight};
    border: none;
    padding: .5em;
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
            &:before {
              content: '\\F00C';
              font: normal normal normal 12px/1 FontAwesome;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              margin-right: 0.5em;
            }
          `
        : css`
            cursor: pointer;
          `}
  
    @media (min-width: 992px) {
      min-width: 14em;
    }    
`;

export default {
  ButtonToggle
};
