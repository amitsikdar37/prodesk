import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { WizardData } from '../schema';
import { Eye, EyeOff } from 'lucide-react';

export default function AccountDetails() {
  const { register, formState: { errors } } = useFormContext<WizardData>();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="step-content animate-in">
      <h2>Account Details</h2>
      <div className="form-group">
        <label>Email</label>
        <input type="email" {...register('email')} className={errors.email ? 'error-input' : ''} />
        {errors.email && <span className="error-text">{errors.email.message}</span>}
      </div>
      <div className="form-group">
        <label>Password</label>
        <div className="input-with-icon">
          <input 
            type={showPassword ? 'text' : 'password'} 
            {...register('password')} 
            className={errors.password ? 'error-input' : ''} 
          />
          <button type="button" className="icon-btn" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && <span className="error-text">{errors.password.message}</span>}
      </div>
      <div className="form-group">
        <label>Confirm Password</label>
        <input type="password" {...register('confirmPassword')} className={errors.confirmPassword ? 'error-input' : ''} />
        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword.message}</span>}
      </div>
    </div>
  );
}
