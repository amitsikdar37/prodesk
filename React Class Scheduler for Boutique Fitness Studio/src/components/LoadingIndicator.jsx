import { Loader2 } from 'lucide-react';

export const LoadingIndicator = () => {
  return (
    <div className="spinner-container" aria-live="polite" aria-busy="true">
      <Loader2 className="spinner" size={32} />
    </div>
  );
};
