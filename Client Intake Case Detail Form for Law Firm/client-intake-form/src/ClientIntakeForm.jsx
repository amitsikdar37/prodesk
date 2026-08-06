import { useState } from 'react';

// Helpers
function sanitizeInput(inputStr) {
  if (!inputStr) {
    return '';
  }
  let cleanStr = inputStr.replace(/</g, '&lt;');
  cleanStr = cleanStr.replace(/>/g, '&gt;');
  return cleanStr;
}

export default function ClientIntakeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    caseType: '',
    incidentDate: '',
    description: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [networkErrorMsg, setNetworkErrorMsg] = useState('');

  const validateStep = (step) => {
    let newErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required.';
        isValid = false;
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required.';
        isValid = false;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required.';
        isValid = false;
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format.';
        isValid = false;
      }

      const phoneRegex = /^\d{10}$/;
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required (10 digits).';
        isValid = false;
      } else if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Invalid phone format. Please enter 10 digits.';
        isValid = false;
      }
    }

    if (step === 2) {
      if (!formData.caseType.trim()) {
        newErrors.caseType = 'Case type is required.';
        isValid = false;
      }
      
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!formData.incidentDate.trim()) {
        newErrors.incidentDate = 'Incident date is required.';
        isValid = false;
      } else if (!dateRegex.test(formData.incidentDate)) {
        newErrors.incidentDate = 'Invalid date format.';
        isValid = false;
      }

      if (!formData.description.trim()) {
        newErrors.description = 'Case description is required.';
        isValid = false;
      }
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    const isStepValid = validateStep(currentStep);
    if (!isStepValid) {
      return; 
    }
    
    console.log('[Analytics] User progressed to step', currentStep + 1);
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    console.log('[Analytics] User went back to step', currentStep - 1);
    setFormErrors({});
    setCurrentStep((prev) => prev - 1);
  };

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const rawValue = event.target.value;
    const sanitizedValue = sanitizeInput(rawValue);

    setFormData((prevData) => {
      let updatedData = { ...prevData };
      updatedData[fieldName] = sanitizedValue;
      return updatedData;
    });

    if (formErrors[fieldName]) {
      setFormErrors((prevErrors) => {
        let updatedErrors = { ...prevErrors };
        delete updatedErrors[fieldName];
        return updatedErrors;
      });
    }
  };

  const handleSubmit = async () => {
    console.log('[Analytics] User initiated submission of Client Intake Form');
    setIsSubmitting(true);
    setSubmitStatus(null);
    setNetworkErrorMsg('');

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.15) {
            reject(new Error('Network connectivity lost.'));
          } else {
            resolve();
          }
        }, 2000);
      });

      console.log('[Analytics] Submission successful');
      setSubmitStatus('success');
    } catch (error) {
      console.error('[Analytics] Submission failed:', error);
      setSubmitStatus('error');
      setNetworkErrorMsg('Failed to securely transmit data. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    if (submitStatus === 'success') {
      return (
        <div className="step-content success-state" role="status" aria-live="polite">
          <h2>Submission Successful</h2>
          <p>The client intake form has been securely transmitted and recorded.</p>
          <button 
            type="button"
            className="btn btn-primary fade-in" 
            onClick={() => window.location.reload()}
            style={{ marginTop: '16px' }}
          >
            Start New Form
          </button>
        </div>
      );
    }

    if (currentStep === 1) {
      return (
        <div className="step-content fade-in" role="group" aria-labelledby="step-title">
          <h2 id="step-title">Client Information</h2>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
              aria-label="First Name"
              aria-invalid={!!formErrors.firstName}
              aria-describedby={formErrors.firstName ? 'firstName-error' : undefined}
              className={formErrors.firstName ? 'input-error' : ''}
              disabled={isSubmitting}
            />
            {formErrors.firstName && <span id="firstName-error" className="error-text" role="alert">{formErrors.firstName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleChange} 
              aria-label="Last Name"
              aria-invalid={!!formErrors.lastName}
              aria-describedby={formErrors.lastName ? 'lastName-error' : undefined}
              className={formErrors.lastName ? 'input-error' : ''}
              disabled={isSubmitting}
            />
            {formErrors.lastName && <span id="lastName-error" className="error-text" role="alert">{formErrors.lastName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              aria-label="Email"
              aria-invalid={!!formErrors.email}
              aria-describedby={formErrors.email ? 'email-error' : undefined}
              className={formErrors.email ? 'input-error' : ''}
              disabled={isSubmitting}
            />
            {formErrors.email && <span id="email-error" className="error-text" role="alert">{formErrors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              aria-label="Phone Number"
              aria-invalid={!!formErrors.phone}
              aria-describedby={formErrors.phone ? 'phone-error' : undefined}
              className={formErrors.phone ? 'input-error' : ''}
              disabled={isSubmitting}
            />
            {formErrors.phone && <span id="phone-error" className="error-text" role="alert">{formErrors.phone}</span>}
          </div>
        </div>
      );
    } 
    
    if (currentStep === 2) {
      return (
        <div className="step-content fade-in" role="group" aria-labelledby="step-title">
          <h2 id="step-title">Case Details</h2>
          <div className="form-group">
            <label htmlFor="caseType">Case Type</label>
            <select 
              id="caseType" 
              name="caseType" 
              value={formData.caseType} 
              onChange={handleChange}
              aria-label="Case Type"
              aria-invalid={!!formErrors.caseType}
              aria-describedby={formErrors.caseType ? 'caseType-error' : undefined}
              className={formErrors.caseType ? 'input-error' : ''}
              disabled={isSubmitting}
            >
              <option value="">Select a case type</option>
              <option value="Personal Injury">Personal Injury</option>
              <option value="Family Law">Family Law</option>
              <option value="Criminal Defense">Criminal Defense</option>
              <option value="Corporate">Corporate</option>
            </select>
            {formErrors.caseType && <span id="caseType-error" className="error-text" role="alert">{formErrors.caseType}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="incidentDate">Incident Date</label>
            <input 
              type="date" 
              id="incidentDate" 
              name="incidentDate" 
              value={formData.incidentDate} 
              onChange={handleChange}
              aria-label="Incident Date"
              aria-invalid={!!formErrors.incidentDate}
              aria-describedby={formErrors.incidentDate ? 'incidentDate-error' : undefined}
              className={formErrors.incidentDate ? 'input-error' : ''}
              disabled={isSubmitting}
            />
            {formErrors.incidentDate && <span id="incidentDate-error" className="error-text" role="alert">{formErrors.incidentDate}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Case Description</label>
            <textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              aria-label="Case Description"
              aria-invalid={!!formErrors.description}
              aria-describedby={formErrors.description ? 'description-error' : undefined}
              rows="4"
              className={formErrors.description ? 'input-error' : ''}
              disabled={isSubmitting}
            ></textarea>
            {formErrors.description && <span id="description-error" className="error-text" role="alert">{formErrors.description}</span>}
          </div>
        </div>
      );
    } 
    
    if (currentStep === 3) {
      return (
        <div className="step-content fade-in" role="group" aria-labelledby="step-title">
          <h2 id="step-title">Review & Submit</h2>
          <div className="review-section">
            <h3>Client Information</h3>
            <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
          </div>
          <div className="review-section">
            <h3>Case Details</h3>
            <p><strong>Type:</strong> {formData.caseType}</p>
            <p><strong>Date:</strong> {formData.incidentDate}</p>
            <p><strong>Description:</strong> {formData.description}</p>
          </div>
        </div>
      );
    }

    return (
      <p className="empty-state">No form data found for this step.</p>
    );
  };

  const renderFooterButtons = () => {
    if (submitStatus === 'success') {
      return null;
    }

    let nextButton = null;

    if (currentStep < 3) {
      nextButton = (
        <button 
          type="button"
          className="btn btn-primary" 
          onClick={handleNext} 
          aria-label="Go to next step"
          disabled={isSubmitting}
        >
          Next
        </button>
      );
    } else if (currentStep === 3) {
      nextButton = (
        <button 
          type="button"
          className="btn btn-primary submit-btn" 
          onClick={handleSubmit} 
          aria-label="Submit Form"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading-spinner" aria-hidden="true"></span>
          ) : null}
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      );
    }

    return (
      <>
        <button 
          type="button"
          className="btn btn-secondary" 
          onClick={handlePrevious} 
          disabled={currentStep === 1 || isSubmitting}
          aria-label="Go to previous step"
        >
          Previous
        </button>
        {nextButton}
      </>
    );
  };

  return (
    <div className="form-container">
      <header className="form-header">
        <h1>Client Intake & Case Detail</h1>
        {submitStatus !== 'success' && (
          <p className="step-indicator" aria-live="polite">Step {currentStep} of 3</p>
        )}
      </header>

      <form className="form-body" onSubmit={(e) => e.preventDefault()} noValidate>
        {submitStatus === 'error' && (
          <div className="network-error-banner" role="alert" aria-live="assertive">
            <p>{networkErrorMsg}</p>
          </div>
        )}
        {renderStepContent()}
      </form>

      {submitStatus !== 'success' && (
        <footer className="form-footer">
          {renderFooterButtons()}
        </footer>
      )}
    </div>
  );
}
