import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { wizardSchema, type WizardData } from './schema';
import PersonalInfo from './components/PersonalInfo';
import AccountDetails from './components/AccountDetails';
import ReviewSubmit from './components/ReviewSubmit';
import { CheckCircle } from 'lucide-react';
import './index.css';

export default function App() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const methods = useForm<WizardData>({
    resolver: zodResolver(wizardSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const { formState: { errors }, watch } = methods;
  const values = watch();

  const onSubmit = (data: WizardData) => {
    console.log('Finalized Payload:', data);
    setIsSuccess(true);
  };

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'dob'];
    } else if (step === 2) {
      fieldsToValidate = ['email', 'password', 'confirmPassword'];
    }
    
    const isValid = await methods.trigger(fieldsToValidate);
    if (isValid) setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  let isNextDisabled = true;
  if (step === 1) {
    isNextDisabled = !values.firstName || !values.lastName || !values.dob || !!errors.firstName || !!errors.lastName || !!errors.dob;
  } else if (step === 2) {
    isNextDisabled = !values.email || !values.password || !values.confirmPassword || !!errors.email || !!errors.password || !!errors.confirmPassword;
  }

  if (isSuccess) {
    return (
      <div className="container">
        <div className="card success-card animate-in">
          <CheckCircle className="success-icon mx-auto" />
          <h1>Registration Complete!</h1>
          <p>Your account has been successfully created.</p>
          <button className="btn primary" onClick={() => window.location.reload()}>Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="progress-container">
          <div className="progress-text">Step {step} of 3</div>
          <div className="progress-bar-bg">
            <div className="progress-bar" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="form-container">
            {step === 1 && <PersonalInfo />}
            {step === 2 && <AccountDetails />}
            {step === 3 && <ReviewSubmit />}
            
            <div className="form-actions">
              {step > 1 && (
                <button type="button" className="btn secondary" onClick={prevStep}>
                  Back
                </button>
              )}
              {step < 3 && (
                <button 
                  type="button" 
                  className="btn primary" 
                  onClick={nextStep}
                  disabled={isNextDisabled}
                >
                  Next
                </button>
              )}
              {step === 3 && (
                <button type="submit" className="btn primary">
                  Submit
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
