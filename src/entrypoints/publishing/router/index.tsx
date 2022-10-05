import React, { memo, FC, Suspense } from 'react';
import { compose } from 'redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Footer from '@fellesdatakatalog/internal-footer';

import Header from '../components/header';
import Root from '../components/root';
import lazyWithRetry from '../../../lib/lazyWithRetry';
import { PATHNAME_PUBLISHING } from '../../../constants/constants';
import localization from '../../../lib/localization';
import translationService from '../../../services/translations';

const Router: FC = () => (
  <BrowserRouter>
    <Helmet>
      <html lang={translationService.getLanguage()} />
      <title>{localization.head.title}</title>

      <meta name='description' content={localization.head.description} />
      <meta property='og:title' content={localization.head.title} />
      <meta property='og:description' content={localization.head.description} />
    </Helmet>
    <Header />
    <Root>
      <Suspense fallback={null}>
        <Switch>
          <Route
            path={PATHNAME_PUBLISHING}
            component={lazyWithRetry(() => import('./publishing'))}
          />
          <Redirect to={PATHNAME_PUBLISHING} />
        </Switch>
      </Suspense>
    </Root>
    <Footer />
  </BrowserRouter>
);

export default compose<FC>(memo)(Router);
