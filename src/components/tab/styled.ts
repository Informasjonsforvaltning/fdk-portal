import styled, { css } from 'styled-components';
import { Entity } from '../../types/enums';
import AllIconBase from '../../images/icon-catalog-all-md.svg';

const Tab = styled.div<{ active?: boolean; variant?: Entity }>`
  align-items: center;
  border: 0;
  box-sizing: border-box;
  display: flex;
  flex-grow: 1;
  padding: 1em 1.5em;
  text-decoration: none;

  @media (min-width: 768px) {
    padding: 0.5em 1em;
  }

  background-color: ${({ variant, theme }) =>
    variant ? theme.extendedColors[variant]?.light : 'none'};

  ${({ active }) =>
    active &&
    css`
      background-color: ${({ theme }) => theme.extendedColors.neutralLightest};
    `}
`;

const Icon = styled.div<{ variant?: Entity }>`
  border-radius: 50%;
  background-color: white;
      
  & > svg {
    padding: 0.5em;
    height: 2.5em;
    fill: ${({ variant, theme }) =>
      variant
        ? theme.extendedColors[variant]?.dark
        : theme.extendedColors.neutralLight};
    
    @media (min-width: 768px) {
      height: 2em;
    }
  }
  }      
`;

const AllIcon = styled(AllIconBase)`
  padding: 0.5em;
  height: 3em;

  @media (min-width: 768px) {
    height: 2em;
  }
`;

const Label = styled.span`
  margin-left: 0.5em;
  white-space: nowrap;
  @media (max-width: 768px) {
    display: none;
    margin-left: 0;
  }
`;

export default {
  Tab,
  Icon,
  AllIcon,
  Label
};
