import React, { FC } from 'react';
import DocumentMeta from 'react-document-meta';
import { AppNavBar } from '../../app/app-nav-bar/app-nav-bar';
import { getConfig } from '../../config';
import localization from '../../lib/localization';

interface Props {
  onChangeLanguage: (language: string) => void;
}

const Header: FC<Props> = ({ onChangeLanguage }) => (
  <div>
    {getConfig().themeNap && <DocumentMeta {...{ title: 'NAP' }} />}
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
