import { useState } from 'react';

// Helpers
function sanitizeInput(inputStr) {
  if (!inputStr) {
    return '';
  }
  // Basic XSS sanitization as per requirement: Sanitize all text inputs against XSS injection before storing them in state.
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
      return; // Early return on invalid validation
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

  const handleSubmit = () => {
    console.log('[Analytics] User submitted Client Intake & Case Detail Form');
    // Phase 3 will handle actual submission & network states
  };

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <div className="step-content">
          <h2>Client Information</h2>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleChange} 
              aria-label="First Name"
              className={formErrors.firstName ? 'input-error' : ''}
            />
            {formErrors.firstName && <span className="error-text">{formErrors.firstName}</span>}
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
              className={formErrors.lastName ? 'input-error' : ''}
            />
            {formErrors.lastName && <span className="error-text">{formErrors.lastName}</span>}
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
              className={formErrors.email ? 'input-error' : ''}
            />
            {formErrors.email && <span className="error-text">{formErrors.email}</span>}
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
              className={formErrors.phone ? 'input-error' : ''}
            />
            {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
          </div>
        </div>
      );
    } 
    
    if (currentStep === 2) {
      return (
        <div className="step-content">
          <h2>Case Details</h2>
          <div className="form-group">
            <label htmlFor="caseType">Case Type</label>
            <select 
              id="caseType" 
              name="caseType" 
              value={formData.caseType} 
              onChange={handleChange}
              aria-label="Case Type"
              className={formErrors.caseType ? 'input-error' : ''}
            >
              <option value="">Select a case type</option>
              <option value="Personal Injury">Personal Injury</option>
              <option value="Family Law">Family Law</option>
              <option value="Criminal Defense">Criminal Defense</option>
              <option value="Corporate">Corporate</option>
            </select>
            {formErrors.caseType && <span className="error-text">{formErrors.caseType}</span>}
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
              className={formErrors.incidentDate ? 'input-error' : ''}
            />
            {formErrors.incidentDate && <span className="error-text">{formErrors.incidentDate}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Case Description</label>
            <textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              aria-label="Case Description"
              rows="4"
              className={formErrors.description ? 'input-error' : ''}
            ></textarea>
            {formErrors.description && <span className="error-text">{formErrors.description}</span>}
          </div>
        </div>
      );
    } 
    
    if (currentStep === 3) {
      return (
        <div className="step-content">
          <h2>Review & Submit</h2>
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

    // Fallback early return for unexpected states
    return (
      <p className="empty-state">No form data found for this step.</p>
    );
  };

  const renderFooterButtons = () => {
    let nextButton = null;

    if (currentStep < 3) {
      nextButton = (
        <button 
          className="btn btn-primary" 
          onClick={handleNext} 
          aria-label="Go to next step"
        >
          Next
        </button>
      );
    } else if (currentStep === 3) {
      nextButton = (
        <button 
          className="btn btn-primary" 
          onClick={handleSubmit} 
          aria-label="Submit Form"
        >
          Submit
        </button>
      );
    }

    return (
      <>
        <button 
          className="btn btn-secondary" 
          onClick={handlePrevious} 
          disabled={currentStep === 1}
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
        <p className="step-indicator">Step {currentStep} of 3</p>
      </header>

      <div className="form-body">
        {renderStepContent()}
      </div>

      <footer className="form-footer">
        {renderFooterButtons()}
      </footer>
    </div>
  );
}
