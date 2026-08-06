import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { crashed: false, msg: '' }
  }

  static getDerivedStateFromError(err) {
    return { crashed: true, msg: err.message || 'Unknown error' }
  }

  componentDidCatch(err, info) {
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
