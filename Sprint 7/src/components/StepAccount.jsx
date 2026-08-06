import React from 'react'

/**
 * StepAccount — Step 2.
 * Reads/writes email, password, confirmPassword via props.
 * Phase 2 will layer regex validation on top of this shell.
 */
export default function StepAccount({ formData, updateField, onNext, onBack }) {
  const { email, password, confirmPassword } = formData

  // Bare minimum gate for Phase 1 — all fields non-empty.
  const canProceed =
    email.trim() !== '' &&
    password.trim() !== '' &&
    confirmPassword.trim() !== ''

  return (
    <div className="step">
      <h2 className="step-title">Account Details</h2>
      <p className="step-desc">Set up your login credentials.</p>

      <div className="field-group">
        <label htmlFor="email" className="field-label">
          Email Address <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          type="email"
          className="field-input"
          placeholder="jane@example.com"
          value={email}
          autoComplete="email"
          onChange={(e) => updateField('email', e.target.value)}
        />
      </div>

      <div className="field-group">
        <label htmlFor="password" className="field-label">
          Password <span className="required" aria-hidden="true">*</span>
        </label>
        {/* Phase 2 will add a show/hide toggle here */}
        <input
          id="password"
          type="password"
          className="field-input"
          placeholder="Min 8 characters"
          value={password}
          autoComplete="new-password"
          onChange={(e) => updateField('password', e.target.value)}
        />
      </div>

      <div className="field-group">
        <label htmlFor="confirmPassword" className="field-label">
          Confirm Password <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="field-input"
          placeholder="Repeat your password"
          value={confirmPassword}
          autoComplete="new-password"
          onChange={(e) => updateField('confirmPassword', e.target.value)}
        />
      </div>

      <div className="step-actions step-actions--two">
        <button className="btn btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <button
          className="btn btn-primary"
          onClick={onNext}
          disabled={!canProceed}
          aria-disabled={!canProceed}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
