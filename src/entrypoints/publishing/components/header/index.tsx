import React, { memo, FC } from 'react';
import { compose } from 'redux';

import env from '../../../../env';

import Translation from '../../../../components/translation';

import SC from './styled';

const { FDK_REGISTRATION_BASE_URI, ADMIN_GUI_BASE_URI } = env;

const Header: FC = () => (
  <SC.Header>
    <SC.Row>
      <SC.Logo />
      <SC.NavigationLinks>
        <li>
          <SC.Link href={FDK_REGISTRATION_BASE_URI}>
            <Translation id="menu.registerData" />
          </SC.Link>
        </li>
        <li>
          <SC.Link href={ADMIN_GUI_BASE_URI}>
            <Translation id="menu.harvestData" />
          </SC.Link>
        </li>
        <li>
          <SC.Link href="/publishing/terms-of-use">
            <Translation id="menu.termsOfUse" />
          </SC.Link>
        </li>
        <li>
          <SC.Link href="/" target="_self" external>
            <Translation id="menu.searchInFdk" />
          </SC.Link>
        </li>
      </SC.NavigationLinks>
    </SC.Row>
  </SC.Header>
);

export default compose<FC>(memo)(Header);
