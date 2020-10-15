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
  title: string;
}

const SideMenu: FC<Props> = ({ menuItems = [], title = '', ...props }) => (
  <SC.SideMenu data-testid={testIds.root} {...props}>
    <SC.Menu>
      {title && <SC.Title>{title}</SC.Title>}
      <ul>
        {menuItems.map(({ id, title }) => (
          <SC.MenuItem key={id}>
            <Link to={id} smooth isDynamic spy>
              {title}
            </Link>
          </SC.MenuItem>
        ))}
      </ul>
    </SC.Menu>
  </SC.SideMenu>
);

export default memo(SideMenu);
