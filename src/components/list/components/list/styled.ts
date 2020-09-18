import styled from 'styled-components';
import CollapseIconBase from '../../../../images/icon-collapse-md.svg';
import ExpandIconBase from '../../../../images/icon-expand-md.svg';

const ListHeader = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.extendedColors.neutralDarkest};
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

const Expansion = styled.button`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.dark} !important;
  cursor: pointer;
  display: flex;
  margin-top: 1em;
`;

const CollapseIcon = styled(CollapseIconBase)`
  height: 16px;
  width: 16px;
  margin-right: 0.5em;
`;

const ExpandIcon = styled(ExpandIconBase)`
  height: 16px;
  width: 16px;
  margin-right: 0.5em;
`;

export default {
  List,
  ListHeader,
  HeaderText,
  Expansion,
  CollapseIcon,
  ExpandIcon
};
