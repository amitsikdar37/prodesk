import React, { useState } from 'react'
import ProgressBar from './ProgressBar.jsx'
import StepPersonal from './StepPersonal.jsx'
import StepAccount from './StepAccount.jsx'
import StepReview from './StepReview.jsx'
import SuccessScreen from './SuccessScreen.jsx'

const TOTAL_STEPS = 3

/**
 * WizardShell — Single source of truth for all form data.
 * Owns the step index and the unified payload so child steps
 * never hold their own independent copies (data persistence across nav).
 */
export default function WizardShell() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  // Unified payload — lifted here so Back navigation never wipes fields.
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  // Patch only the changed key(s); leave everything else untouched.
  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function goNext() {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1)
    }
  }

  function goBack() {
    if (step > 1) {
      setStep((s) => s - 1)
    }
  }

  function handleSubmit() {
    // Phase 1: console.log the payload; Phase 3 will wire an API call.
    console.log('[Wizard] Final payload:', formData)
    setSubmitted(true)
  }

  if (submitted) {
    return <SuccessScreen formData={formData} />
  }

  function renderStep() {
    if (step === 1) {
      return (
        <StepPersonal
          formData={formData}
          updateField={updateField}
          onNext={goNext}
        />
      )
    }

    if (step === 2) {
      return (
        <StepAccount
          formData={formData}
          updateField={updateField}
          onNext={goNext}
          onBack={goBack}
        />
      )
    }

    if (step === 3) {
      return (
        <StepReview
          formData={formData}
          onBack={goBack}
          onSubmit={handleSubmit}
        />
      )
    }

    // Safeguard — should never reach here.
    return null
  }

  return (
    <div className="wizard-wrap">
      <div className="wizard-card">
        <header className="wizard-header">
          <h1 className="wizard-title">Create your account</h1>
          <p className="wizard-subtitle">
            It only takes a minute — we promise.
          </p>
        </header>

        <ProgressBar current={step} total={TOTAL_STEPS} />

        <div className="wizard-body">
          {renderStep()}
        </div>
      </div>
    </div>
  )
}
