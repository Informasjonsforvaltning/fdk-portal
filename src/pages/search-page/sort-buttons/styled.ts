import styled from 'styled-components';

import ButtonToggleSC from '../../../components/button-toggle/styled';

const SortButtons = styled.div`
  display: flex;
  justify-content: center;
  @media (min-width: 992px) {
    justify-content: flex-end;
  }

  @media (max-width: 992px) {
    & > ${ButtonToggleSC.ButtonToggle} {
      flex-grow: 1;
    }
  }
`;

export default { SortButtons };
