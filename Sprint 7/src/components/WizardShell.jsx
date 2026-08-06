import React, { useState } from 'react'
import ProgressBar from './ProgressBar.jsx'
import StepPersonal from './StepPersonal.jsx'
import StepAccount from './StepAccount.jsx'
import StepReview from './StepReview.jsx'
import SuccessScreen from './SuccessScreen.jsx'

const TOTAL_STEPS = 3

/**
 * Simulated API call — 1.5s latency.
 * Rejects ~15% of the time to demonstrate the network failure fallback UI.
 * Phase 4 would replace this with a real fetch/axios call.
 */
function fakeApiSubmit(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.15) {
        reject(new Error('Network error — server unreachable. Please try again.'))
        return
      }
      resolve({ ok: true, userId: 'usr_' + Date.now() })
    }, 1500)
  })
}

/**
 * WizardShell — Phase 3.
 * onStepComplete(stepData) replaces the old per-field updateField.
 * Each step submits its validated zod payload here; we merge it into formData.
 * This means WizardShell always holds a union of all clean, validated data.
 */
export default function WizardShell() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Unified payload — source of truth, seeded as defaultValues in each step's useForm.
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  // Called by each step on a successful RHF handleSubmit.
  // Merges the step's validated data and advances the wizard.
  function onStepComplete(stepData) {
    setFormData((prev) => ({ ...prev, ...stepData }))
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1)
    }
  }

  function goBack() {
    if (step > 1) {
      setStep((s) => s - 1)
      setSubmitError('') // clear any lingering error if user goes back from review
    }
  }

  async function handleFinalSubmit() {
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const result = await fakeApiSubmit(formData)
      console.log('[Wizard] Final payload submitted:', formData)
      console.log('[Wizard] API response:', result)
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return <SuccessScreen formData={formData} />
  }

  function renderStep() {
    if (step === 1) {
      return (
        <StepPersonal
          formData={formData}
          onStepComplete={onStepComplete}
        />
      )
    }

    if (step === 2) {
      return (
        <StepAccount
          formData={formData}
          onStepComplete={onStepComplete}
          onBack={goBack}
        />
      )
    }

    if (step === 3) {
      return (
        <StepReview
          formData={formData}
          onBack={goBack}
          onSubmit={handleFinalSubmit}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      )
    }

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
