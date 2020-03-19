import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const TabLink = styled(Link)`
  align-items: center;
  background: none;
  border: 0;
  box-sizing: border-box;
  display: flex;
  padding: 0.4em 1em;
  text-decoration: none;
`;

const Tab = styled.li<{ active?: boolean }>`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-color: green;
    
    justify-content: center;
    list-style-type: none;
    
    ${({ active }) =>
      active &&
      css`
        background-color: ${({ theme }) => theme.colors.neutralLightest};
      `}
    }
    
    ${TabLink} {
        color: #FFF;
        
        ${({ active }) =>
          active &&
          css`
            color: ${({ theme }) => theme.colors.neutralDarker};
          `}
    }
`;

export default {
  Tab,
  TabLink
};
