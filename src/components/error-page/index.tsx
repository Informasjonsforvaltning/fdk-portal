import React, { FC } from 'react';
import cx from 'classnames';

import { getConfig } from '../../config';
import localization from '../../lib/localization';

import Error400 from './components/error-400';
import Error500 from './components/error-500';

import SC from './styled';
import Header from '../header';
import Footer from '../footer';

interface Props {
  errorCode?: string;
  language?: string;
  onChangeLanguage?: (language: string) => void;
}

const errorMessage = (errorCode?: string) => {
  switch (errorCode) {
    case '404':
      return <Error400 />;
    case '500':
    default:
      return <Error500 />;
  }
};

const themeClass = cx('position-relative overflow-hidden', {
  'theme-nap': getConfig().themeNap,
  'theme-fdk': !getConfig().themeNap
});

const ErrorPage: FC<Props> = ({ errorCode, language, onChangeLanguage }) => {
  if (language && onChangeLanguage) {
    localization.setLanguage(language);
  }

  return language && onChangeLanguage ? (
    <div className={themeClass}>
      <Header onChangeLanguage={onChangeLanguage} />
      <SC.ErrorPage>
        {errorMessage(errorCode)}
        <SC.UpperRightBackground />
      </SC.ErrorPage>
      <Footer />
    </div>
  ) : (
    <SC.ErrorPage>
      {errorMessage(errorCode)}
      <SC.UpperRightBackground />
    </SC.ErrorPage>
  );
};

export default ErrorPage;
