import React, { memo, FC, Suspense } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, Switch, Route, Redirect } from 'react-router-dom';
import lazyWithRetry from '../../../../lib/lazyWithRetry';
import routes from '../../../../routes';

const PublishingRouter: FC<RouteComponentProps> = ({ match: { url } }) => (
  <Suspense fallback={null}>
    <Switch>
      {Object.keys(routes.publishing).map((path: string) => (
        <Route
          exact
          path={path}
          component={lazyWithRetry(
            () => import(`./pages/${routes.publishing[path].page}`)
          )}
        />
      ))}
      <Redirect to={url} />
    </Switch>
  </Suspense>
);

export default compose<FC>(memo)(PublishingRouter);
