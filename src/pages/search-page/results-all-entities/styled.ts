import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  margin-top: 2em;
  @media (min-width: 992px) {
    flex-direction: row-reverse;
    margin-top: 4em;
  }
`;

const Filters = styled.aside`
  @media (max-width: 992px) {
    display: none;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
`;

export default { Content, Filters, Pagination };
