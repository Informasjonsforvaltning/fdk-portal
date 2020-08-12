import React, { memo, FC, lazy, Suspense } from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

const pages = {
  organizations: lazy(() => import('./pages/organizations-page')),
  organization: lazy(() => import('./pages/organization-page')),
  datasets: lazy(() => import('./pages/datasets-page')),
  dataset: lazy(() => import('./pages/dataset-page'))
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
