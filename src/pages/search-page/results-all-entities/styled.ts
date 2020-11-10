import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const Filters = styled.aside``;

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
