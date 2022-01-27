import React, { memo, FC, Suspense } from 'react';
import { compose } from 'redux';
import { RouteComponentProps, Switch, Route, Redirect } from 'react-router-dom';
import lazyWithRetry from '../../../../lib/lazyWithRetry';
import routes from '../../../../routes';
import { PATHNAME_PUBLISHING } from '../../../../constants/constants';

const components: any = {
  [PATHNAME_PUBLISHING]: lazyWithRetry(() => import(`./pages/publishing-page`)),
  [`${PATHNAME_PUBLISHING}/about-registration`]: lazyWithRetry(
    () => import(`./pages/about-registration-page`)
  ),
  [`${PATHNAME_PUBLISHING}/about-harvesting`]: lazyWithRetry(
    () => import(`./pages/about-harvesting-page`)
  ),
  [`${PATHNAME_PUBLISHING}/terms-of-use`]: lazyWithRetry(
    () => import(`./pages/terms-of-use-page`)
  ),
  [`${PATHNAME_PUBLISHING}/service-messages`]: lazyWithRetry(
    () => import(`./pages/service-messages-page`)
  ),
  [`${PATHNAME_PUBLISHING}/service-messages/all`]: lazyWithRetry(
    () => import(`./pages/service-messages-page`)
  ),
  [`${PATHNAME_PUBLISHING}/service-messages/:id`]: lazyWithRetry(
    () => import(`./pages/service-message-page`)
  )
};

const PublishingRouter: FC<RouteComponentProps> = ({ match: { url } }) => (
  <Suspense fallback={null}>
    <Switch>
      {routes.publishing.map((path: string) => (
        <Route exact path={path} component={components[path]} />
      ))}
      <Redirect to={url} />
    </Switch>
  </Suspense>
);

export default compose<FC>(memo)(PublishingRouter);
