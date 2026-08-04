import { useState } from 'react';
import { sanitizeInput } from '../utils/security';
import { validateEmail, validatePhone, validateRequired } from '../utils/validation';

export default function ClientDetailsStep({ data, updateData, nextStep }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: sanitizeInput(value) });
    setErrors({ ...errors, [name]: '' });
  };

  const handleNext = () => {
    const newErrors = {};
    if (!validateRequired(data.name || '')) newErrors.name = 'Name is required';
    if (!validateEmail(data.email || '')) newErrors.email = 'Invalid email';
    if (!validatePhone(data.phone || '')) newErrors.phone = 'Invalid phone number';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      nextStep();
    }
  };

  return (
    <div className="step-container">
      <h2>Client Details</h2>
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={data.name || ''}
          onChange={handleChange}
          className={errors.name ? 'input-error' : ''}
          aria-label="Full Name"
          aria-invalid={!!errors.name}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email || ''}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
          aria-label="Email Address"
          aria-invalid={!!errors.email}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={data.phone || ''}
          onChange={handleChange}
          className={errors.phone ? 'input-error' : ''}
          aria-label="Phone Number"
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <span className="error-text">{errors.phone}</span>}
      </div>
      <button onClick={handleNext} className="btn-primary" aria-label="Next Step">Next</button>
    </div>
  );
}
