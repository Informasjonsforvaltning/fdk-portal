import styled from 'styled-components';

const ListHeader = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.extendedColors.neutralDarker};
  border-radius: 2px;
  color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 0.25em;
  padding: 0.5em 1.5em;
  text-decoration: none;
`;

const HeaderText = styled.span``;

const List = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 1.5em;
  width: 100%;
`;

export default { List, ListHeader, HeaderText };
