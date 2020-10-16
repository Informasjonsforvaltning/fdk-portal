import React, { memo, FC, PropsWithChildren } from 'react';

import FdkLink from '@fellesdatakatalog/link';

import SC from './styled';
import {
  DropdownMenuItem,
  DropdownButtonItem,
  DropdownLinkItem
} from '../../../../types';

const isButtonItem = (item: DropdownMenuItem): item is DropdownButtonItem =>
  (item as DropdownButtonItem).onClick !== undefined;

const isLinkItem = (item: DropdownMenuItem): item is DropdownLinkItem =>
  (item as DropdownLinkItem).url !== undefined;

const createMenuItem = (item: DropdownMenuItem) => {
  if (isButtonItem(item)) {
    return <SC.ButtonItem onClick={item.onClick}>{item.label}</SC.ButtonItem>;
  }
  if (isLinkItem(item)) {
    return (
      <SC.LinkItem>
        <FdkLink href={item.url}>{item.label}</FdkLink>
      </SC.LinkItem>
    );
  }

  return item.label;
};

interface Props {
  content: DropdownMenuItem;
}

const MenuItem: FC<PropsWithChildren<Props>> = ({ content }) => (
  <SC.MenuItem>{createMenuItem(content)}</SC.MenuItem>
);

export default memo(MenuItem);
