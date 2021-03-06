import React, { ComponentType } from 'react';

import ErrorBoundary from './error-boundary';

const withErrorBoundary = (fallback?: ComponentType<any>) => (
  Component: ComponentType<any>
) => (props: any) => {
  return (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
};

export default withErrorBoundary;
