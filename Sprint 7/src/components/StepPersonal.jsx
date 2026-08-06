import React, { useState } from 'react'

// ── Validators ────────────────────────────────────────────────────────────────

function validateFirstName(val) {
  if (val.trim() === '') return 'First name is required.'
  if (val.trim().length < 2) return 'Must be at least 2 characters.'
  return ''
}

function validateLastName(val) {
  if (val.trim() === '') return 'Last name is required.'
  if (val.trim().length < 2) return 'Must be at least 2 characters.'
  return ''
}

function validateDob(val) {
  if (!val) return 'Date of birth is required.'
  const entered = new Date(val + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (entered >= today) return 'Date of birth cannot be today or in the future.'
  // Sanity check: no one is 150 years old.
  const minYear = today.getFullYear() - 150
  if (entered.getFullYear() < minYear) return 'Enter a valid date of birth.'
  return ''
}

/**
 * StepPersonal — Step 1 with Phase 2 validation layer.
 * Touched state prevents error messages firing on a pristine form.
 */
export default function StepPersonal({ formData, updateField, onNext }) {
  const { firstName, lastName, dob } = formData

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    dob: false,
  })

  function markTouched(field) {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const firstNameErr = validateFirstName(firstName)
  const lastNameErr = validateLastName(lastName)
  const dobErr = validateDob(dob)

  const canProceed = firstNameErr === '' && lastNameErr === '' && dobErr === ''

  // Build the max date string for the DOB input (today - 1 day).
  const today = new Date()
  today.setDate(today.getDate() - 1)
  const maxDate = today.toISOString().split('T')[0]

  return (
    <div className="step">
      <h2 className="step-title">Personal Information</h2>
      <p className="step-desc">Tell us a bit about yourself.</p>

      {/* First Name ─────────────────────────────────────────────────────────── */}
      <div className="field-group">
        <label htmlFor="firstName" className="field-label">
          First Name <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="firstName"
          type="text"
          className={`field-input ${touched.firstName && firstNameErr ? 'field-input--error' : ''}`}
          placeholder="e.g. Jane"
          value={firstName}
          autoComplete="given-name"
          onChange={(e) => { updateField('firstName', e.target.value); markTouched('firstName') }}
          onBlur={() => markTouched('firstName')}
          aria-describedby={touched.firstName && firstNameErr ? 'fn-err' : undefined}
          aria-invalid={touched.firstName && firstNameErr ? 'true' : 'false'}
        />
        {touched.firstName && firstNameErr && (
          <span id="fn-err" className="field-error" role="alert">
            {firstNameErr}
          </span>
        )}
      </div>

      {/* Last Name ──────────────────────────────────────────────────────────── */}
      <div className="field-group">
        <label htmlFor="lastName" className="field-label">
          Last Name <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="lastName"
          type="text"
          className={`field-input ${touched.lastName && lastNameErr ? 'field-input--error' : ''}`}
          placeholder="e.g. Doe"
          value={lastName}
          autoComplete="family-name"
          onChange={(e) => { updateField('lastName', e.target.value); markTouched('lastName') }}
          onBlur={() => markTouched('lastName')}
          aria-describedby={touched.lastName && lastNameErr ? 'ln-err' : undefined}
          aria-invalid={touched.lastName && lastNameErr ? 'true' : 'false'}
        />
        {touched.lastName && lastNameErr && (
          <span id="ln-err" className="field-error" role="alert">
            {lastNameErr}
          </span>
        )}
      </div>

      {/* Date of Birth ──────────────────────────────────────────────────────── */}
      <div className="field-group">
        <label htmlFor="dob" className="field-label">
          Date of Birth <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="dob"
          type="date"
          className={`field-input ${touched.dob && dobErr ? 'field-input--error' : ''}`}
          value={dob}
          max={maxDate}
          autoComplete="bday"
          onChange={(e) => { updateField('dob', e.target.value); markTouched('dob') }}
          onBlur={() => markTouched('dob')}
          aria-describedby={touched.dob && dobErr ? 'dob-err' : undefined}
          aria-invalid={touched.dob && dobErr ? 'true' : 'false'}
        />
        {touched.dob && dobErr && (
          <span id="dob-err" className="field-error" role="alert">
            {dobErr}
          </span>
        )}
      </div>

      <div className="step-actions">
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
