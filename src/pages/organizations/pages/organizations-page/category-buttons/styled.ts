import styled from 'styled-components';

import ButtonToggleSC from './button-toggle/styled';

const CategoryButtons = styled.div`
  display: flex;
  justify-content: center;

  flex-direction: row;

  padding-bottom: 2em;

  @media (min-width: 992px) {
    justify-content: flex-start;
    max-width: 100%;
  }

  @media (max-width: 992px) {
    & > ${ButtonToggleSC.ButtonToggle} {
      flex-grow: 1;
    }
  }
`;

export default { CategoryButtons };
