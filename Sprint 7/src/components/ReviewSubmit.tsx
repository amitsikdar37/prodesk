import { useFormContext } from 'react-hook-form';
import type { WizardData } from '../schema';

export default function ReviewSubmit() {
  const { getValues } = useFormContext<WizardData>();
  const values = getValues();

  return (
    <div className="step-content animate-in">
      <h2>Review & Submit</h2>
      <div className="review-grid">
        <div className="review-item">
          <span className="review-label">First Name</span>
          <span className="review-value">{values.firstName}</span>
        </div>
        <div className="review-item">
          <span className="review-label">Last Name</span>
          <span className="review-value">{values.lastName}</span>
        </div>
        <div className="review-item">
          <span className="review-label">Date of Birth</span>
          <span className="review-value">{values.dob}</span>
        </div>
        <div className="review-item">
          <span className="review-label">Email</span>
          <span className="review-value">{values.email}</span>
        </div>
      </div>
    </div>
  );
}
