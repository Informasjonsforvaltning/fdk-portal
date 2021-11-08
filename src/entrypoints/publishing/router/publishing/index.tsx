import React, { memo, FC, Suspense } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, Switch, Route, Redirect } from 'react-router-dom';
import lazyWithRetry from '../../../../lib/lazyWithRetry';

const pages = {
  publishing: lazyWithRetry(() => import('./pages/publishing-page')),
  aboutRegistration: lazyWithRetry(
    () => import('./pages/about-registration-page')
  ),
  aboutHarvesting: lazyWithRetry(() => import('./pages/about-harvesting-page')),
  termsOfUse: lazyWithRetry(() => import('./pages/terms-of-use-page')),
  serviceMessages: lazyWithRetry(() => import('./pages/service-messages-page')),
  serviceMessage: lazyWithRetry(() => import('./pages/service-message-page'))
};

const PublishingRouter: FC<RouteComponentProps> = ({ match: { url } }) => (
  <Suspense fallback={null}>
    <Switch>
      <Route exact path={url} component={pages.publishing} />
      <Route
        exact
        path={`${url}/about-registration`}
        component={pages.aboutRegistration}
      />
      <Route
        exact
        path={`${url}/about-harvesting`}
        component={pages.aboutHarvesting}
      />
      <Route exact path={`${url}/terms-of-use`} component={pages.termsOfUse} />
      <Route
        exact
        path={`${url}/service-messages`}
        component={pages.serviceMessages}
      />
      <Route
        exact
        path={`${url}/service-messages/:id`}
        component={pages.serviceMessage}
      />
      <Redirect to={url} />
    </Switch>
  </Suspense>
);

export default compose<FC>(memo)(PublishingRouter);
