import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { fallback, children } = this.props;

    return hasError ? fallback : children;
  }
}

export default ErrorBoundary;
