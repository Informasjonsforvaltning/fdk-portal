import React, { memo, FC, Suspense } from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { PATHNAME_ORGANIZATIONS } from '../../constants/constants';
import lazyWithRetry from '../../lib/lazyWithRetry';
import routes from '../../routes';

const components: any = {
  [PATHNAME_ORGANIZATIONS]: lazyWithRetry(
    () => import(`./pages/organizations-page`)
  ),
  [`${PATHNAME_ORGANIZATIONS}/:organizationId`]: lazyWithRetry(
    () => import(`./pages/organization-page`)
  ),
  [`${PATHNAME_ORGANIZATIONS}/:organizationId/datasets`]: lazyWithRetry(
    () => import(`./pages/datasets-page`)
  ),
  [`${PATHNAME_ORGANIZATIONS}/:organizationId/datasets/:datasetId`]:
    lazyWithRetry(() => import(`./pages/dataset-page`))
};

const OrganizationsRouter: FC<RouteComponentProps> = ({ match: { url } }) => (
  <Suspense fallback={null}>
    <Switch>
      {routes.organizations.map((path: string) => (
        <Route exact path={path} component={components[path]} />
      ))}
      <Redirect to={url} />
    </Switch>
  </Suspense>
);

export default memo(OrganizationsRouter);
