import React from 'react'

/**
 * ErrorBoundary — class component (React requires class for error boundaries).
 * Catches any render/lifecycle crash inside the wizard and shows a
 * graceful fallback instead of a blank page.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { crashed: false, msg: '' }
  }

  static getDerivedStateFromError(err) {
    return { crashed: true, msg: err.message || 'Unknown error' }
  }

  componentDidCatch(err, info) {
    // In production you'd ship this to Sentry / Datadog.
    console.error('[ErrorBoundary] Caught:', err, info)
  }

  handleReset() {
    this.setState({ crashed: false, msg: '' })
  }

  render() {
    if (!this.state.crashed) {
      return this.props.children
    }

    return (
      <div className="eb-wrap" role="alert" aria-live="assertive">
        <div className="eb-card">
          <div className="eb-icon" aria-hidden="true">⚠️</div>
          <h1 className="eb-title">Something went wrong</h1>
          <p className="eb-detail">{this.state.msg}</p>
          <button
            className="btn btn-primary"
            onClick={() => this.handleReset()}
          >
            Try again
          </button>
        </div>
      </div>
    )
  }
}
