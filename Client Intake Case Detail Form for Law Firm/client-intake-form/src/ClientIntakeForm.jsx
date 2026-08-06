import { useState } from 'react';

export default function ClientIntakeForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    console.log('[Analytics] User progressed to step', currentStep + 1);
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    console.log('[Analytics] User went back to step', currentStep - 1);
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="form-container">
      <header className="form-header">
        <h1>Client Intake & Case Detail</h1>
        <p className="step-indicator">Step {currentStep} of 3</p>
      </header>

      <div className="form-body">
        {/* Phase 1 Scaffolding: Content will be implemented in Phase 2 */}
        <p className="empty-state">No fields loaded yet. Awaiting Phase 2 core logic.</p>
      </div>

      <footer className="form-footer">
        <button 
          className="btn btn-secondary" 
          onClick={handlePrevious} 
          disabled={currentStep === 1}
          aria-label="Go to previous step"
        >
          Previous
        </button>
        <button 
          className="btn btn-primary" 
          onClick={handleNext} 
          disabled={currentStep === 3}
          aria-label="Go to next step"
        >
          Next
        </button>
      </footer>
    </div>
  );
}
