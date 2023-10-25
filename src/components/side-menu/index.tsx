import React, { memo, FC } from 'react';
import { NavLink as RouteLink } from 'react-router-dom';

import SC from './styled';

interface MenuItem {
  id?: string;
  title: string;
  items?: MenuItem[];
}

interface Props {
  menuItems?: MenuItem[];
  isSticky?: boolean;
}

const SideMenu: FC<Props> = ({ menuItems = [], isSticky, ...props }) => (
  <SC.Menu $isSticky={isSticky} {...props}>
    <ul>
      {menuItems.map(({ id, title: menuItemTitle, items }) => (
        <>
          <SC.MenuItem key={id} isGroup={items && items.length > 0 && !id}>
            {id ? (
              <RouteLink to={id}>{menuItemTitle}</RouteLink>
            ) : (
              <span>{menuItemTitle}</span>
            )}
          </SC.MenuItem>
          {items?.map(({ id: subId, title: subMenuItemTitle }) => (
            <SC.SubMenuItem key={subId}>
              {subId ? (
                <RouteLink to={subId}>{subMenuItemTitle}</RouteLink>
              ) : (
                <span>{subMenuItemTitle}</span>
              )}
            </SC.SubMenuItem>
          ))}
        </>
      ))}
    </ul>
  </SC.Menu>
);

export default memo(SideMenu);
