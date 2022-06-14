import React, { memo, FC } from 'react';
import { Link } from 'react-scroll';

import SC from './styled';

import testIds from './test-ids';

interface MenuItem {
  id: string;
  title: string;
}

interface Props {
  menuItems?: MenuItem[];
}

const SideMenu: FC<Props> = ({ menuItems = [], ...props }) => (
  <SC.SideMenu data-testid={testIds.root} {...props}>
    <SC.Menu>
      <ul>
        {menuItems.map(({ id, title: menuItemTitle }) => (
          <SC.MenuItem key={id}>
            <Link to={id} smooth isDynamic spy>
              {menuItemTitle}
            </Link>
          </SC.MenuItem>
        ))}
      </ul>
    </SC.Menu>
  </SC.SideMenu>
);

export default memo(SideMenu);
