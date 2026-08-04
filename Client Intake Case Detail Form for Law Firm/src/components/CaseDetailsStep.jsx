import { useState } from 'react';
import { sanitizeInput } from '../utils/security';
import { validateRequired } from '../utils/validation';

export default function CaseDetailsStep({ data, updateData, prevStep, submitForm }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: sanitizeInput(value) });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!validateRequired(data.caseType || '')) newErrors.caseType = 'Case type is required';
    if (!validateRequired(data.description || '')) newErrors.description = 'Description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      submitForm();
    }
  };

  return (
    <div className="step-container">
      <h2>Case Details</h2>
      <div className="form-group">
        <label htmlFor="caseType">Case Type</label>
        <select
          id="caseType"
          name="caseType"
          value={data.caseType || ''}
          onChange={handleChange}
          className={errors.caseType ? 'input-error' : ''}
          aria-label="Case Type"
          aria-invalid={!!errors.caseType}
        >
          <option value="">Select a case type</option>
          <option value="Personal Injury">Personal Injury</option>
          <option value="Family Law">Family Law</option>
          <option value="Criminal Defense">Criminal Defense</option>
          <option value="Corporate">Corporate</option>
        </select>
        {errors.caseType && <span className="error-text">{errors.caseType}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="description">Case Description</label>
        <textarea
          id="description"
          name="description"
          value={data.description || ''}
          onChange={handleChange}
          className={errors.description ? 'input-error' : ''}
          aria-label="Case Description"
          aria-invalid={!!errors.description}
          rows={5}
        />
        {errors.description && <span className="error-text">{errors.description}</span>}
      </div>
      <div className="button-group">
        <button onClick={prevStep} className="btn-secondary" aria-label="Previous Step">Back</button>
        <button onClick={handleSubmit} className="btn-primary" aria-label="Submit Form">Submit</button>
      </div>
    </div>
  );
}
