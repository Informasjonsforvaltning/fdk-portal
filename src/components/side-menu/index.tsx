import React, { memo, FC } from 'react';
import { NavLink as RouteLink } from 'react-router-dom';

import SC from './styled';

interface MenuItem {
  id: string;
  title: string;
}

interface Props {
  menuItems?: MenuItem[];
  isSticky?: boolean;
}

const SideMenu: FC<Props> = ({ menuItems = [], isSticky, ...props }) => (
  <SC.Menu $isSticky={isSticky} {...props}>
    <ul>
      {menuItems.map(({ id, title: menuItemTitle }) => (
        <SC.MenuItem key={id}>
          <RouteLink to={id}>{menuItemTitle}</RouteLink>
        </SC.MenuItem>
      ))}
    </ul>
  </SC.Menu>
);

export default memo(SideMenu);
