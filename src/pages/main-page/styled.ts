import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  margin-top: 2em;
  @media (min-width: 992px) {
    flex-direction: row-reverse;
    margin-top: 4em;
  }
`;

export default { Content };
