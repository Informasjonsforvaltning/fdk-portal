import React, { Component, ComponentType, ErrorInfo } from 'react';

interface Props {
  fallback?: ComponentType<any>;
}
interface State {
  hasError: boolean;
  errorCode?: string;
}
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ hasError: true, errorCode: error.message });
  }

  render() {
    const { hasError, errorCode } = this.state;
    const { fallback: Fallback, children } = this.props;

    return hasError && Fallback ? <Fallback errorCode={errorCode} /> : children;
  }
}
