import React from 'react'

/**
 * StepPersonal — Step 1.
 * Reads/writes firstName, lastName, dob via props.
 * No local state — all data lives in WizardShell.
 */
export default function StepPersonal({ formData, updateField, onNext }) {
  const { firstName, lastName, dob } = formData

  // Phase 2 will add real validation here. For now: all fields must be non-empty.
  const canProceed = firstName.trim() !== '' && lastName.trim() !== '' && dob !== ''

  return (
    <div className="step">
      <h2 className="step-title">Personal Information</h2>
      <p className="step-desc">Tell us a bit about yourself.</p>

      <div className="field-group">
        <label htmlFor="firstName" className="field-label">
          First Name <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="firstName"
          type="text"
          className="field-input"
          placeholder="e.g. Jane"
          value={firstName}
          autoComplete="given-name"
          onChange={(e) => updateField('firstName', e.target.value)}
        />
      </div>

      <div className="field-group">
        <label htmlFor="lastName" className="field-label">
          Last Name <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="lastName"
          type="text"
          className="field-input"
          placeholder="e.g. Doe"
          value={lastName}
          autoComplete="family-name"
          onChange={(e) => updateField('lastName', e.target.value)}
        />
      </div>

      <div className="field-group">
        <label htmlFor="dob" className="field-label">
          Date of Birth <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="dob"
          type="date"
          className="field-input"
          value={dob}
          autoComplete="bday"
          onChange={(e) => updateField('dob', e.target.value)}
        />
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
