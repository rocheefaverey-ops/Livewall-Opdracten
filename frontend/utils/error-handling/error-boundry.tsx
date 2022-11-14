import { PageLayout } from '@components/layout';
import { NextRouter, withRouter } from 'next/router';
import React, { ErrorInfo, ReactNode } from 'react';

type ErrorBoundaryProps = {
  FallbackComponent: ReactNode;
  router: NextRouter;
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private sendError: React.MutableRefObject<boolean | null>;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.sendError = React.createRef();
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI

    return { hasError: true, sendError: false };
  }

  async componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    const { router } = this.props;
    // eslint-disable-next-line no-console
    console.warn('Caught error => ', error, 'Error message => ', errorInfo, 'Location => ', router.asPath);
  }

  render() {
    const { hasError } = this.state;
    const { FallbackComponent, children } = this.props;
    // Check if the error is thrown
    if (hasError && this.sendError.current) {
      // You can render any custom fallback UI
      return <PageLayout>{FallbackComponent}</PageLayout>;
    }

    // Return children components in case of no error
    return children;
  }
}

export default withRouter(ErrorBoundary);
