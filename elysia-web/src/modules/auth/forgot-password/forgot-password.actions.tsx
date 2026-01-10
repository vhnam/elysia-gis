import { useForm } from '@tanstack/react-form';
import { AxiosError } from 'axios';
import { startTransition, useState } from 'react';
import { toast } from 'sonner';

import { forgotPasswordSchema } from '@/schemas/auth.schema';

import { useForgotPasswordMutation } from '@/queries/auth';

export const useForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const forgotPasswordMutation = useForgotPasswordMutation({
    onSuccess: () => {
      startTransition(() => {
        setIsSuccess(true);
      });
      toast.success('Reset email sent successfully');
    },
    onError: (error) => {
      toast.error(
        (error as AxiosError).message || 'Failed to send reset email',
      );
    },
  });

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: ({ value }) => {
      startTransition(() => {
        forgotPasswordMutation.mutate(value);
      });
    },
  });

  return {
    form,
    forgotPasswordMutation,
    isSuccess,
  };
};
