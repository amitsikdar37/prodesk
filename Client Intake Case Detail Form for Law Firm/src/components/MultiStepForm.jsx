import { useState } from 'react';
import ClientDetailsStep from './ClientDetailsStep';
import CaseDetailsStep from './CaseDetailsStep';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const updateData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const submitForm = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("[Analytics] User interacted with Client Intake & Case Detail Form");
      setSubmitted(true);
    } catch (err) {
      setError("An error occurred while submitting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container" aria-live="polite">
        <div className="spinner"></div>
        <p>Submitting data...</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="success-container">
        <h2>Submission Successful</h2>
        <p>The client intake form has been recorded.</p>
        <button onClick={() => { setFormData({}); setStep(1); setSubmitted(false); }} className="btn-primary">
          Start New Intake
        </button>
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      {error && <div className="error-banner">{error}</div>}
      {step === 1 && <ClientDetailsStep data={formData} updateData={updateData} nextStep={nextStep} />}
      {step === 2 && <CaseDetailsStep data={formData} updateData={updateData} prevStep={prevStep} submitForm={submitForm} />}
    </div>
  );
}
