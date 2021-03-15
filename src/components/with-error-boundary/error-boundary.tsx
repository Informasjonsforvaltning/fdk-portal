import React, { Component, ComponentType, ErrorInfo } from 'react';

import {
  withLogging,
  Props as LoggingProps,
  Severity
} from '../../providers/logging';

interface Props extends LoggingProps {
  fallback?: ComponentType<any>;
}

interface State {
  hasError: boolean;
  errorCode?: string;
}
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { loggingService } = this.props;
    loggingService.postLogEntry({
      name: error.name,
      message: error.message,
      severity: Severity.ERROR,
      trace: errorInfo.componentStack
    });

    this.setState({ hasError: true, errorCode: error.message });
  }

  render() {
    const { hasError, errorCode } = this.state;
    const { fallback: Fallback, children } = this.props;

    return hasError && Fallback ? <Fallback errorCode={errorCode} /> : children;
  }
}

export default withLogging(ErrorBoundary);
