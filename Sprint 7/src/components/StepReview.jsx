import React from 'react'

/**
 * StepReview — Step 3.
 * Renders a read-only summary of every field collected so far.
 * Password is masked — never show plaintext in a summary view.
 */
export default function StepReview({ formData, onBack, onSubmit }) {
  const { firstName, lastName, dob, email, password } = formData

  // Guard: if somehow we land here with no data, show a warning instead of crashing.
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

  // Mask the password: show bullet chars equal to its length, capped at 12.
  const pwMask = '•'.repeat(Math.min(password.length, 12))

  // Format dob for human readability if a value exists.
  let dobDisplay = dob
  if (dob) {
    const parsed = new Date(dob + 'T00:00:00') // avoid timezone shift
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

      <div className="step-actions step-actions--two">
        <button className="btn btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <button className="btn btn-primary btn-submit" onClick={onSubmit}>
          Submit ✓
        </button>
      </div>
    </div>
  )
}
