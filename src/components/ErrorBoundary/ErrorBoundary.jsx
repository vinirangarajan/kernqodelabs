import { Component } from 'react';
import ErrorPage from '../ErrorPage/ErrorPage';

/**
 * React Error Boundary — catches unhandled JS errors in the component tree
 * and renders the generic ErrorPage instead of a blank screen.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production you'd send this to Sentry / LogRocket etc.
    console.error('[ErrorBoundary]', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          type="generic"
          customMessage="An unexpected error occurred in the application."
          onRetry={this.handleRetry}
        />
      );
    }
    return this.props.children;
  }
}
