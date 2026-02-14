'use client';

import { Button } from '@/components/ui/Button';
import { useEffect, useState } from 'react';

interface RequestSubmitButtonProps {
  formId: string;
}

export function RequestSubmitButton({ formId }: RequestSubmitButtonProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Listen for custom event from RequestForm
    const handleSuccess = () => {
      setIsSuccess(true);
    };

    window.addEventListener('request-submitted', handleSuccess);

    return () => {
      window.removeEventListener('request-submitted', handleSuccess);
    };
  }, []);

  const handleClick = () => {
    if (isSuccess) {
      window.location.reload();
    }
  };

  return (
    <Button
      form={isSuccess ? undefined : formId}
      type={isSuccess ? 'button' : 'submit'}
      variant="primary"
      className="w-full h-12 md:h-14 text-base md:text-lg font-semibold my-12 rounded-full"
      onClick={isSuccess ? handleClick : undefined}
    >
      {isSuccess ? 'Request Another Word' : 'Submit Request'}
    </Button>
  );
}
