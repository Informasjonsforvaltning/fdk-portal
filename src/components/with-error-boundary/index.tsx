import React, { ComponentType } from 'react';

import ErrorBoundary from './error-boundary';

const withErrorBoundary =
  (fallback?: ComponentType<any>, logError?: boolean) =>
  (Component: ComponentType<any>) =>
  (props: any) =>
    (
      <ErrorBoundary fallback={fallback} logError={logError}>
        <Component {...props} />
      </ErrorBoundary>
    );

export default withErrorBoundary;
