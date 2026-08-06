import React, { useState } from 'react'

// ── Validators ────────────────────────────────────────────────────────────────
// Kept as plain functions at module scope — no magic, easy to unit-test later.

function validateEmail(val) {
  if (val.trim() === '') return 'Email is required.'
  if (!val.includes('@')) return 'Email must contain an @ symbol.'
  // Basic structural check: something@something.something
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(val)) return 'Enter a valid email address.'
  return ''
}

function validatePassword(val) {
  if (val === '') return 'Password is required.'
  if (val.length < 8) return `Password must be at least 8 characters (${val.length}/8).`
  return ''
}

function validateConfirm(pw, confirm) {
  if (confirm === '') return 'Please confirm your password.'
  if (confirm !== pw) return 'Passwords do not match.'
  return ''
}

/**
 * StepAccount — Step 2 with full Phase 2 validation layer.
 * Uses local useState ONLY for UI-specific concerns (show/hide password toggles).
 * All actual data still lives in WizardShell via props.
 */
export default function StepAccount({ formData, updateField, onNext, onBack }) {
  const { email, password, confirmPassword } = formData

  // UI-only local state — purely cosmetic, not part of the data payload.
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // Track whether a field has been touched so we don't yell at blank fields on mount.
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  })

  function markTouched(field) {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  // Compute errors — always derived, never stale.
  const emailErr = validateEmail(email)
  const passwordErr = validatePassword(password)
  const confirmErr = validateConfirm(password, confirmPassword)

  const canProceed = emailErr === '' && passwordErr === '' && confirmErr === ''

  function handleEmailChange(e) {
    updateField('email', e.target.value)
    markTouched('email')
  }

  function handlePasswordChange(e) {
    updateField('password', e.target.value)
    markTouched('password')
  }

  function handleConfirmChange(e) {
    updateField('confirmPassword', e.target.value)
    markTouched('confirmPassword')
  }

  return (
    <div className="step">
      <h2 className="step-title">Account Details</h2>
      <p className="step-desc">Set up your login credentials.</p>

      {/* Email ──────────────────────────────────────────────────────────────── */}
      <div className="field-group">
        <label htmlFor="email" className="field-label">
          Email Address <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          type="email"
          className={`field-input ${touched.email && emailErr ? 'field-input--error' : ''}`}
          placeholder="jane@example.com"
          value={email}
          autoComplete="email"
          onChange={handleEmailChange}
          onBlur={() => markTouched('email')}
          aria-describedby={touched.email && emailErr ? 'email-err' : undefined}
          aria-invalid={touched.email && emailErr ? 'true' : 'false'}
        />
        {touched.email && emailErr && (
          <span id="email-err" className="field-error" role="alert">
            {emailErr}
          </span>
        )}
      </div>

      {/* Password ───────────────────────────────────────────────────────────── */}
      <div className="field-group">
        <label htmlFor="password" className="field-label">
          Password <span className="required" aria-hidden="true">*</span>
        </label>
        <div className="input-wrap">
          <input
            id="password"
            type={showPw ? 'text' : 'password'}
            className={`field-input field-input--icon ${touched.password && passwordErr ? 'field-input--error' : ''}`}
            placeholder="Min. 8 characters"
            value={password}
            autoComplete="new-password"
            onChange={handlePasswordChange}
            onBlur={() => markTouched('password')}
            aria-describedby={touched.password && passwordErr ? 'pw-err' : undefined}
            aria-invalid={touched.password && passwordErr ? 'true' : 'false'}
          />
          <button
            type="button"
            className="toggle-vis"
            onClick={() => setShowPw((v) => !v)}
            aria-label={showPw ? 'Hide password' : 'Show password'}
            tabIndex={0}
          >
            {showPw ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {touched.password && passwordErr && (
          <span id="pw-err" className="field-error" role="alert">
            {passwordErr}
          </span>
        )}
      </div>

      {/* Confirm Password ───────────────────────────────────────────────────── */}
      <div className="field-group">
        <label htmlFor="confirmPassword" className="field-label">
          Confirm Password <span className="required" aria-hidden="true">*</span>
        </label>
        <div className="input-wrap">
          <input
            id="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            className={`field-input field-input--icon ${touched.confirmPassword && confirmErr ? 'field-input--error' : ''}`}
            placeholder="Repeat your password"
            value={confirmPassword}
            autoComplete="new-password"
            onChange={handleConfirmChange}
            onBlur={() => markTouched('confirmPassword')}
            aria-describedby={touched.confirmPassword && confirmErr ? 'confirm-err' : undefined}
            aria-invalid={touched.confirmPassword && confirmErr ? 'true' : 'false'}
          />
          <button
            type="button"
            className="toggle-vis"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
            tabIndex={0}
          >
            {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {touched.confirmPassword && confirmErr && (
          <span id="confirm-err" className="field-error" role="alert">
            {confirmErr}
          </span>
        )}
      </div>

      {/* Password strength hint ─────────────────────────────────────────────── */}
      {password.length > 0 && (
        <PasswordStrength password={password} />
      )}

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

// ── Sub-components ────────────────────────────────────────────────────────────
// Inline SVG icons — no icon library dependency needed.

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

/**
 * PasswordStrength — visual indicator, 3 tiers: Weak / Fair / Strong.
 * Rules: < 8 = Weak, 8-11 = Fair, 12+ with mixed chars = Strong.
 */
function PasswordStrength({ password }) {
  let level = 0
  let label = 'Weak'
  let colorClass = 'strength--weak'

  const hasUpper = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)

  if (password.length >= 8) level = 1
  if (password.length >= 10 && (hasUpper || hasNumber)) level = 2
  if (password.length >= 12 && hasUpper && hasNumber && hasSpecial) level = 3

  if (level === 1) { label = 'Fair';   colorClass = 'strength--fair' }
  if (level === 2) { label = 'Good';   colorClass = 'strength--good' }
  if (level === 3) { label = 'Strong'; colorClass = 'strength--strong' }

  const bars = [1, 2, 3]

  return (
    <div className="strength-wrap" aria-live="polite" aria-label={`Password strength: ${label}`}>
      <div className="strength-bars">
        {bars.map((bar) => (
          <div
            key={bar}
            className={`strength-bar ${bar <= level + 1 ? colorClass : ''}`}
          />
        ))}
      </div>
      <span className={`strength-label ${colorClass}`}>{label}</span>
    </div>
  )
}
