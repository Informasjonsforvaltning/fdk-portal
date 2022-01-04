import React, { memo, FC, Suspense } from 'react';
import { compose } from 'redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Footer from '@fellesdatakatalog/internal-footer';

import Header from '../components/header';
import Root from '../components/root';
import lazyWithRetry from '../../../lib/lazyWithRetry';
import { PATHNAME_PUBLISHING } from '../../../constants/constants';

const Router: FC = () => (
  <BrowserRouter>
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
