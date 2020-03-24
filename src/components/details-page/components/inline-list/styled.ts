import styled from 'styled-components';

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: -10px -10px 0 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  margin-top: 10px;
  margin-right: 10px;
`;

export default { List, ListItem };
