import React, { memo, FC, Suspense } from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import lazyWithRetry from '../../lib/lazyWithRetry';
import routes from '../../routes';

const OrganizationsRouter: FC<RouteComponentProps> = ({ match: { url } }) => (
  <Suspense fallback={null}>
    <Switch>
      {Object.keys(routes.organizations).map((path: string) => (
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

export default memo(OrganizationsRouter);
