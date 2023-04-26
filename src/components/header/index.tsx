import React from 'react';
import type { FC } from 'react';
import { AppNavBar } from '../../app/app-nav-bar/app-nav-bar';

interface Props {
  onChangeLanguage: (language: string) => void;
}

const Header: FC<Props> = ({ onChangeLanguage }) => (
  <div>
    <AppNavBar onChangeLanguage={onChangeLanguage} />
  </div>
);

export default Header;
