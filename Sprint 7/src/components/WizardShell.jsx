import React, { useState } from 'react'
import ProgressBar from './ProgressBar.jsx'
import StepPersonal from './StepPersonal.jsx'
import StepAccount from './StepAccount.jsx'
import StepReview from './StepReview.jsx'
import SuccessScreen from './SuccessScreen.jsx'

const TOTAL_STEPS = 3

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

export default function WizardShell() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  function onStepComplete(stepData) {
    setFormData((prev) => ({ ...prev, ...stepData }))
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1)
    }
  }

  function goBack() {
    if (step > 1) {
      setStep((s) => s - 1)
      setSubmitError('')
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
