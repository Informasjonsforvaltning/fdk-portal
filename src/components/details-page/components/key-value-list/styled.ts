import styled from 'styled-components';

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  &:nth-of-type(n + 2) {
    margin-top: 10px;
  }
`;

export default { List };
