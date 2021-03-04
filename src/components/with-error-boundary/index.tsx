import React, { ComponentType, ReactNode } from 'react';

import ErrorBoundary from './error-boundary';

const withErrorBoundary = (fallback?: ReactNode) => (
  Component: ComponentType<any>
) => (props: any) => {
  return (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
};

export default withErrorBoundary;
