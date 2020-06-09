import React, { FC, memo } from 'react';

import SC from './styled';
import ListItem from '../list-item/list-item.component';

interface ListItem {
  id: string;
  path?: string;
  text1?: string;
  text2?: string;
}

interface Props {
  headerText1: string;
  headerText2: string;
  listItems?: ListItem[];
}

const renderListItems = (listItems: ListItem[]) =>
  listItems.map(({ id, path = '', text1, text2 }: ListItem) => (
    <ListItem key={`item-${id}`} to={path} text1={text1} text2={text2} />
  ));

const List: FC<Props> = ({ listItems = [], headerText1, headerText2 }) => (
  <SC.List>
    <SC.ListHeader>
      <SC.HeaderText>{headerText1}</SC.HeaderText>
      <SC.HeaderText>{headerText2}</SC.HeaderText>
    </SC.ListHeader>
    {listItems && renderListItems(listItems)}
  </SC.List>
);

export default memo(List);
