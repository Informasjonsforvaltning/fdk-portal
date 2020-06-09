import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListItem = styled(Link)`
  align-items: center;
  background-color: ${({ theme }) => theme.lighter};
  border-radius: 2px;
  color: ${({ theme }) => theme.dark} !important;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 0.25em;
  padding: 0.5em 1.5em;
  text-decoration: none;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: #000;
    color: #fff !important;
    text-decoration: none;
  }
`;

const Text = styled.span``;

export default { ListItem, Text };
