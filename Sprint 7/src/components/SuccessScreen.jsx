import React from 'react'

export default function SuccessScreen({ formData }) {
  const name = formData.firstName || 'there'

  return (
    <div className="wizard-wrap">
      <div className="wizard-card success-card">
        <div className="success-icon" aria-hidden="true">🎉</div>
        <h1 className="success-title">You're all set, {name}!</h1>
        <p className="success-body">
          Your account has been created successfully. Check your inbox at{' '}
          <strong>{formData.email}</strong> to verify your email address.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Start over (demo)
        </button>
      </div>
    </div>
  )
}
