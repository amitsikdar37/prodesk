import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { personalSchema } from '../schema.js'

export default function StepPersonal({ formData, onStepComplete }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dob: formData.dob,
    },
    mode: 'onChange',
  })

  const today = new Date()
  today.setDate(today.getDate() - 1)
  const maxDate = today.toISOString().split('T')[0]

  function onValid(data) {
    onStepComplete(data)
  }

  return (
    <form onSubmit={handleSubmit(onValid)} className="step" noValidate>
      <h2 className="step-title">Personal Information</h2>
      <p className="step-desc">Tell us a bit about yourself.</p>

      <div className="field-group">
        <label htmlFor="firstName" className="field-label">
          First Name <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="firstName"
          type="text"
          placeholder="e.g. Jane"
          autoComplete="given-name"
          className={`field-input ${errors.firstName ? 'field-input--error' : ''}`}
          aria-describedby={errors.firstName ? 'fn-err' : undefined}
          aria-invalid={errors.firstName ? 'true' : 'false'}
          {...register('firstName')}
        />
        {errors.firstName && (
          <span id="fn-err" className="field-error" role="alert">
            {errors.firstName.message}
          </span>
        )}
      </div>

      <div className="field-group">
        <label htmlFor="lastName" className="field-label">
          Last Name <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="lastName"
          type="text"
          placeholder="e.g. Doe"
          autoComplete="family-name"
          className={`field-input ${errors.lastName ? 'field-input--error' : ''}`}
          aria-describedby={errors.lastName ? 'ln-err' : undefined}
          aria-invalid={errors.lastName ? 'true' : 'false'}
          {...register('lastName')}
        />
        {errors.lastName && (
          <span id="ln-err" className="field-error" role="alert">
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div className="field-group">
        <label htmlFor="dob" className="field-label">
          Date of Birth <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="dob"
          type="date"
          max={maxDate}
          autoComplete="bday"
          className={`field-input ${errors.dob ? 'field-input--error' : ''}`}
          aria-describedby={errors.dob ? 'dob-err' : undefined}
          aria-invalid={errors.dob ? 'true' : 'false'}
          {...register('dob')}
        />
        {errors.dob && (
          <span id="dob-err" className="field-error" role="alert">
            {errors.dob.message}
          </span>
        )}
      </div>

      <div className="step-actions">
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
