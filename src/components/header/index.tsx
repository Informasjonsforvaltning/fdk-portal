import React from 'react';
import type { FC } from 'react';
import { AppNavBar } from '../../app/app-nav-bar/app-nav-bar';
import localization from '../../lib/localization';

interface Props {
  onChangeLanguage: (language: string) => void;
}

const Header: FC<Props> = ({ onChangeLanguage }) => (
  <div>
    <div>
      <a
        id='focus-element'
        className='uu-invisible'
        href={`${location.pathname}#content`}
        aria-hidden='true'
      >
        {localization.goToMainContent}
      </a>
    </div>
    <AppNavBar onChangeLanguage={onChangeLanguage} />
  </div>
);

export default Header;
