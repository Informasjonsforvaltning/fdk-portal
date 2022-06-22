import React, { memo, FC } from 'react';
import { NavLink as RouteLink } from 'react-router-dom';

import SC from './styled';

interface MenuItem {
  id: string;
  title: string;
}

interface Props {
  menuItems?: MenuItem[];
}

const SideMenu: FC<Props> = ({ menuItems = [], ...props }) => (
  <SC.Menu {...props}>
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
