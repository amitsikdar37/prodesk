import React from 'react'

/**
 * StepReview — Phase 3.
 * Receives isSubmitting + submitError from WizardShell.
 * Shows a loading spinner on Submit, and an inline error banner on failure.
 */
export default function StepReview({ formData, onBack, onSubmit, isSubmitting, submitError }) {
  const { firstName, lastName, dob, email, password } = formData

  // Guard: empty payload should not be submittable — just a safety net.
  if (!firstName && !email) {
    return (
      <div className="step">
        <p className="review-missing">
          No data found. Please go back and fill in the form.
        </p>
        <div className="step-actions">
          <button className="btn btn-ghost" onClick={onBack}>
            ← Back
          </button>
        </div>
      </div>
    )
  }

  const pwMask = '•'.repeat(Math.min(password.length, 12))

  let dobDisplay = dob
  if (dob) {
    const parsed = new Date(dob + 'T00:00:00')
    dobDisplay = parsed.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const rows = [
    { label: 'First Name', value: firstName },
    { label: 'Last Name', value: lastName },
    { label: 'Date of Birth', value: dobDisplay || '—' },
    { label: 'Email', value: email },
    { label: 'Password', value: pwMask || '—' },
  ]

  return (
    <div className="step">
      <h2 className="step-title">Review &amp; Submit</h2>
      <p className="step-desc">
        Double-check your details before submitting.
      </p>

      <dl className="review-list">
        {rows.map((row) => (
          <div key={row.label} className="review-row">
            <dt className="review-key">{row.label}</dt>
            <dd className="review-val">{row.value || '—'}</dd>
          </div>
        ))}
      </dl>

      {/* Network error banner — only shown when submitError is non-empty */}
      {submitError && (
        <div className="submit-error" role="alert" aria-live="assertive">
          <span className="submit-error-icon" aria-hidden="true">⚠</span>
          {submitError}
        </div>
      )}

      <div className="step-actions step-actions--two">
        <button
          className="btn btn-ghost"
          onClick={onBack}
          disabled={isSubmitting}
        >
          ← Back
        </button>
        <button
          className="btn btn-primary btn-submit"
          onClick={onSubmit}
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : 'Submit ✓'}
        </button>
      </div>
    </div>
  )
}

function Spinner() {
  return (
    <span className="spinner-wrap" aria-label="Submitting…">
      <span className="spinner" aria-hidden="true" />
      Submitting…
    </span>
  )
}
