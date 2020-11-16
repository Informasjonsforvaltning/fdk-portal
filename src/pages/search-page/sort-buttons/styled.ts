import styled from 'styled-components';

const SortButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (min-width: 992px) {
    justify-content: flex-end;
  }
`;

export default { SortButtons };
