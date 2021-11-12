import React, { memo, FC, Suspense } from 'react';
import { compose } from 'redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Footer from '@fellesdatakatalog/internal-footer';

import Header from '../components/header';
import Root from '../components/root';
import lazyWithRetry from '../../../lib/lazyWithRetry';

const routes = {
  publishing: lazyWithRetry(() => import('./publishing'))
};

const Router: FC = () => (
  <BrowserRouter>
    <Header />
    <Root>
      <Suspense fallback={null}>
        <Switch>
          <Route path='/publishing' component={routes.publishing} />
          <Redirect to='/publishing' />
        </Switch>
      </Suspense>
    </Root>
    <Footer />
  </BrowserRouter>
);

export default compose<FC>(memo)(Router);
