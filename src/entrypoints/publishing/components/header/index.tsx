import React, { memo, FC, useState } from 'react';
import { compose } from 'redux';

import env from '../../../../env';

import Translation from '../../../../components/translation';
import { Trigger, Menu } from '../dropdown-menu';

import SC from './styled';
import { PATHNAME_PUBLISHING } from '../../../../constants/constants';
import localization from '../../../../lib/localization';

const { FDK_REGISTRATION_BASE_URI, ADMIN_GUI_BASE_URI } = env;

const Header: FC = () => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  const openDropdownMenu = () => setIsDropdownMenuOpen(true);
  const closeDropdownMenu = () => setIsDropdownMenuOpen(false);

  return (
    <SC.Header>
      <SC.Row>
        <a href={PATHNAME_PUBLISHING}>
          <SC.Logo />
          {localization.publishing}
        </a>
        <SC.NavigationLinks>
          <li>
            <SC.Link href={FDK_REGISTRATION_BASE_URI}>
              <Translation id='menu.registerData' />
            </SC.Link>
          </li>
          <li>
            <SC.Link href={ADMIN_GUI_BASE_URI}>
              <Translation id='menu.harvestData' />
            </SC.Link>
          </li>
          <li>
            <SC.Link href={`${PATHNAME_PUBLISHING}/terms-of-use`}>
              <Translation id='menu.termsOfUse' />
            </SC.Link>
          </li>
          <li>
            <SC.Link href='/' target='_self' external>
              <Translation id='menu.searchInFdk' />
            </SC.Link>
          </li>
        </SC.NavigationLinks>
        <SC.DropdownMenu
          isOpen={isDropdownMenuOpen}
          onClose={closeDropdownMenu}
        >
          <Trigger>
            <SC.MenuButton onClick={openDropdownMenu}>
              <Translation id='app.menu' />
            </SC.MenuButton>
          </Trigger>
          <Menu>
            <SC.Menu>
              <li>
                <SC.Link href={FDK_REGISTRATION_BASE_URI}>
                  <Translation id='menu.registerData' />
                </SC.Link>
              </li>
              <li>
                <SC.Link href={ADMIN_GUI_BASE_URI}>
                  <Translation id='menu.harvestData' />
                </SC.Link>
              </li>
              <li>
                <SC.Link href={`${PATHNAME_PUBLISHING}/terms-of-use`}>
                  <Translation id='menu.termsOfUse' />
                </SC.Link>
              </li>
              <li>
                <SC.Link href='/' target='_self' external>
                  <Translation id='menu.searchInFdk' />
                </SC.Link>
              </li>
            </SC.Menu>
          </Menu>
        </SC.DropdownMenu>
      </SC.Row>
    </SC.Header>
  );
};

export default compose<FC>(memo)(Header);
