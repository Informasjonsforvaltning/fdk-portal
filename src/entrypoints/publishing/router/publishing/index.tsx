import React, { memo, FC, Suspense, lazy } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, Switch, Route, Redirect } from 'react-router-dom';

const pages = {
  publishing: lazy(() => import('./pages/publishing-page')),
  aboutRegistration: lazy(() => import('./pages/about-registration-page')),
  aboutHarvesting: lazy(() => import('./pages/about-harvesting-page')),
  termsOfUse: lazy(() => import('./pages/terms-of-use-page')),
  serviceMessages: lazy(() => import('./pages/service-messages-page')),
  serviceMessage: lazy(() => import('./pages/service-message-page'))
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
      {false && (
        <Route
          exact
          path={`${url}/service-messages`}
          component={pages.serviceMessages}
        />
      )}
      {false && (
        <Route
          exact
          path={`${url}/service-messages/:id`}
          component={pages.serviceMessage}
        />
      )}
      <Redirect to={url} />
    </Switch>
  </Suspense>
);

export default compose<FC>(memo)(PublishingRouter);
