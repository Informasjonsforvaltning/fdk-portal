import styled from 'styled-components';

const List = styled.ul<{ column: boolean }>`
  display: flex;
  flex-wrap: wrap;
  margin: -10px -10px 0 0;
  padding: 0;
  list-style: none;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  & > li {
    padding-top: ${({ column }) => (column ? '5px' : '0px')};
    border-top: ${({ column, theme }) =>
      column ? `1px solid ${theme.entityColours.light}` : 'none'};
  }
  & > :first-child {
    border-top: 0px;
    padding-top: 0px;
  }
`;

const ListItem = styled.li`
  margin-top: 10px;
  margin-right: 10px;
`;

export default { List, ListItem };
