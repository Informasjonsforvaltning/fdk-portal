import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  margin-top: 1rem;
  @media (min-width: 992px) {
    flex-direction: row-reverse;
  }
`;

const Filters = styled.aside`
  @media (max-width: 992px) {
    display: none;
  }
`;

const SortButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (min-width: 992px) {
    justify-content: flex-end;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
`;

export default { Content, Filters, SortButtons, Pagination };
