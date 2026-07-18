import { useState } from 'react';
import { sanitizeInput } from '../utils/sanitize.js';
import { logAction } from '../utils/telemetry.js';

export const ClassForm = ({ onAddClass }) => {
  const [formData, setFormData] = useState({ name: '', instructor: '', time: '' });
  const [errors, setErrors] = useState({ name: false, instructor: false, time: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {
      name: !formData.name.trim(),
      instructor: !formData.instructor.trim(),
      time: !formData.time.trim()
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(error => error)) {
      logAction('ClassForm_Validation_Failed', newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    const newClass = {
      id: crypto.randomUUID(),
      name: sanitizeInput(formData.name),
      instructor: sanitizeInput(formData.instructor),
      time: sanitizeInput(formData.time)
    };
    
    setTimeout(() => {
      onAddClass(newClass);
      logAction('Class_Added', newClass);
      setFormData({ name: '', instructor: '', time: '' });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="card">
      <h2 className="card-title">Schedule New Class</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="className" className="form-label">Class Name</label>
          <input
            id="className"
            name="name"
            type="text"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={errors.name}
            aria-describedby={errors.name ? "className-error" : undefined}
            disabled={isSubmitting}
          />
          {errors.name && (
            <span id="className-error" className="error-message">Class Name is required.</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="instructor" className="form-label">Instructor</label>
          <input
            id="instructor"
            name="instructor"
            type="text"
            className="form-input"
            value={formData.instructor}
            onChange={handleChange}
            aria-invalid={errors.instructor}
            aria-describedby={errors.instructor ? "instructor-error" : undefined}
            disabled={isSubmitting}
          />
          {errors.instructor && (
            <span id="instructor-error" className="error-message">Instructor is required.</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="time" className="form-label">Time</label>
          <input
            id="time"
            name="time"
            type="text"
            placeholder="e.g., 09:00 AM"
            className="form-input"
            value={formData.time}
            onChange={handleChange}
            aria-invalid={errors.time}
            aria-describedby={errors.time ? "time-error" : undefined}
            disabled={isSubmitting}
          />
          {errors.time && (
            <span id="time-error" className="error-message">Time is required.</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Scheduling...' : 'Schedule Class'}
        </button>
      </form>
    </div>
  );
};
