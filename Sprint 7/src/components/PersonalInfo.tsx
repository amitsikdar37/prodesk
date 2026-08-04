import { useFormContext } from 'react-hook-form';
import type { WizardData } from '../schema';

export default function PersonalInfo() {
  const { register, formState: { errors } } = useFormContext<WizardData>();

  return (
    <div className="step-content animate-in">
      <h2>Personal Information</h2>
      <div className="form-group">
        <label>First Name</label>
        <input type="text" {...register('firstName')} className={errors.firstName ? 'error-input' : ''} />
        {errors.firstName && <span className="error-text">{errors.firstName.message}</span>}
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input type="text" {...register('lastName')} className={errors.lastName ? 'error-input' : ''} />
        {errors.lastName && <span className="error-text">{errors.lastName.message}</span>}
      </div>
      <div className="form-group">
        <label>Date of Birth</label>
        <input type="date" {...register('dob')} className={errors.dob ? 'error-input' : ''} />
        {errors.dob && <span className="error-text">{errors.dob.message}</span>}
      </div>
    </div>
  );
}
