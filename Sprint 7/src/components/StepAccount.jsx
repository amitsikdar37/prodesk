import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { accountSchema } from '../schema.js'

/**
 * StepAccount — Phase 3.
 * useForm + zodResolver handles all field validation including the cross-field
 * confirm-password check (defined in the schema, not here).
 * Local useState is kept ONLY for show/hide toggles — purely cosmetic UI state.
 */
export default function StepAccount({ formData, onStepComplete, onBack }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    },
    mode: 'onChange',
  })

  // UI-only: cosmetic show/hide toggles. Not payload data — YAGNI says keep local.
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  // watch gives us the live password value to feed into the strength meter.
  const livePw = watch('password') || ''

  function onValid(data) {
    onStepComplete(data)
  }

  // Split register result so we can override `type` independently.
  const passwordReg = register('password')
  const confirmReg = register('confirmPassword')

  return (
    <form onSubmit={handleSubmit(onValid)} className="step" noValidate>
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
          placeholder="jane@example.com"
          autoComplete="email"
          className={`field-input ${errors.email ? 'field-input--error' : ''}`}
          aria-describedby={errors.email ? 'email-err' : undefined}
          aria-invalid={errors.email ? 'true' : 'false'}
          {...register('email')}
        />
        {errors.email && (
          <span id="email-err" className="field-error" role="alert">
            {errors.email.message}
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
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            className={`field-input field-input--icon ${errors.password ? 'field-input--error' : ''}`}
            aria-describedby={errors.password ? 'pw-err' : undefined}
            aria-invalid={errors.password ? 'true' : 'false'}
            type={showPw ? 'text' : 'password'}
            name={passwordReg.name}
            ref={passwordReg.ref}
            onChange={passwordReg.onChange}
            onBlur={passwordReg.onBlur}
          />
          <button
            type="button"
            className="toggle-vis"
            onClick={() => setShowPw((v) => !v)}
            aria-label={showPw ? 'Hide password' : 'Show password'}
          >
            {showPw ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {errors.password && (
          <span id="pw-err" className="field-error" role="alert">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Password strength ───────────────────────────────────────────────────── */}
      {livePw.length > 0 && <PasswordStrength password={livePw} />}

      {/* Confirm Password ───────────────────────────────────────────────────── */}
      <div className="field-group">
        <label htmlFor="confirmPassword" className="field-label">
          Confirm Password <span className="required" aria-hidden="true">*</span>
        </label>
        <div className="input-wrap">
          <input
            id="confirmPassword"
            placeholder="Repeat your password"
            autoComplete="new-password"
            className={`field-input field-input--icon ${errors.confirmPassword ? 'field-input--error' : ''}`}
            aria-describedby={errors.confirmPassword ? 'confirm-err' : undefined}
            aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            type={showConfirm ? 'text' : 'password'}
            name={confirmReg.name}
            ref={confirmReg.ref}
            onChange={confirmReg.onChange}
            onBlur={confirmReg.onBlur}
          />
          <button
            type="button"
            className="toggle-vis"
            onClick={() => setShowConfirm((v) => !v)}
            aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
          >
            {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {errors.confirmPassword && (
          <span id="confirm-err" className="field-error" role="alert">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <div className="step-actions step-actions--two">
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isValid}
          aria-disabled={!isValid}
        >
          Next →
        </button>
      </div>
    </form>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

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
