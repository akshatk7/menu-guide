import { useEffect } from 'react';

interface ErrorToastProps {
  show: boolean;
  onDismiss: () => void;
}

const ErrorToast = ({ show, onDismiss }: ErrorToastProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onDismiss]);

  if (!show) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-destructive text-destructive-foreground px-6 py-3 rounded-xl shadow-lg">
        <p className="text-sm font-medium">
          Something went wrong. Try again.
        </p>
      </div>
    </div>
  );
};

export default ErrorToast;