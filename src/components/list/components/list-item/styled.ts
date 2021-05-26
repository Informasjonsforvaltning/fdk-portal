import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '@fellesdatakatalog/theme';

const ListItem = styled(Link)`
  align-items: center;
  background-color: ${({ theme: t }) => t.lighter};
  border-radius: 2px;
  color: ${({ theme: t }) => t.dark} !important;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25em;
  padding: 0.5em 1.5em;
  text-decoration: none;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: ${({ theme: t }) => t.extendedColors.neutralDarkest};
    color: #fff !important;
    text-decoration: none;
  }

  & > span:first-child {
    margin-right: ${theme.spacing('S16')};
  }
`;

const Text = styled.span``;

export default { ListItem, Text };
