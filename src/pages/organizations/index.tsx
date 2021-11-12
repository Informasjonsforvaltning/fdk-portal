import React, { memo, FC, Suspense } from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import lazyWithRetry from '../../lib/lazyWithRetry';

const pages = {
  organizations: lazyWithRetry(() => import('./pages/organizations-page')),
  organization: lazyWithRetry(() => import('./pages/organization-page')),
  datasets: lazyWithRetry(() => import('./pages/datasets-page')),
  dataset: lazyWithRetry(() => import('./pages/dataset-page'))
};

const OrganizationsRouter: FC<RouteComponentProps> = ({ match: { url } }) => (
  <Suspense fallback={null}>
    <Switch>
      <Route exact path={url} component={pages.organizations} />
      <Route
        exact
        path={`${url}/:organizationId`}
        component={pages.organization}
      />
      <Route
        exact
        path={`${url}/:organizationId/datasets`}
        component={pages.datasets}
      />
      <Route
        exact
        path={`${url}/:organizationId/datasets/:datasetId`}
        component={pages.dataset}
      />
      <Redirect to={url} />
    </Switch>
  </Suspense>
);

export default memo(OrganizationsRouter);
