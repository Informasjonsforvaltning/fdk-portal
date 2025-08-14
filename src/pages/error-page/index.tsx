import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import cx from 'classnames';

import { getConfig } from '../../config';
import localization from '../../lib/localization';

import Error400 from './components/error-400';
import Error500 from './components/error-500';

import SC from './styled';
import Header from '../../components/header';
import Footer from '../../components/footer';

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
  'theme-nap': getConfig().isNapProfile,
  'theme-fdk': !getConfig().isNapProfile
});

const ErrorPage: FC<Props> = ({ errorCode, language, onChangeLanguage }) => {
  if (language && onChangeLanguage) {
    localization.setLanguage(language);
  }

  const errorTitle =
    errorCode === '404'
      ? `${localization.errorPage.notFound} - data.norge.no`
      : `${localization.errorPage.serverError} - data.norge.no`;

  return language && onChangeLanguage ? (
    <div className={themeClass}>
      <Helmet>
        <title>{errorTitle}</title>
        <meta name='description' content={localization.head.description} />
        <meta property='og:title' content={errorTitle} />
        <meta
          property='og:description'
          content={localization.head.description}
        />
        <meta property='og:type' content='website' />
      </Helmet>
      <Header onChangeLanguage={onChangeLanguage} />
      <SC.ErrorPage>
        {errorMessage(errorCode)}
        <SC.UpperRightBackground />
      </SC.ErrorPage>
      <Footer />
    </div>
  ) : (
    <SC.ErrorPage>
      <Helmet>
        <title>{errorTitle}</title>
        <meta name='description' content={localization.head.description} />
        <meta property='og:title' content={errorTitle} />
        <meta
          property='og:description'
          content={localization.head.description}
        />
        <meta property='og:type' content='website' />
      </Helmet>
      {errorMessage(errorCode)}
      <SC.UpperRightBackground />
    </SC.ErrorPage>
  );
};

export default ErrorPage;
