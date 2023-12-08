import React from 'react';
import type { FC } from 'react';
import { AppNavBar } from '../../app/app-nav-bar/app-nav-bar';
import SC from './styled';

interface Props {
  onChangeLanguage: (language: string) => void;
}

const Header: FC<Props> = ({ onChangeLanguage }) => (
  <SC.Header>
    <AppNavBar onChangeLanguage={onChangeLanguage} />
  </SC.Header>
);

export default Header;
