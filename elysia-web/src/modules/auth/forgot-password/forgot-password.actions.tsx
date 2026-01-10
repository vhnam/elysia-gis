import { useForm } from '@tanstack/react-form';
import { useState } from 'react';

import { forgotPasswordSchema } from '@/schemas/auth.schema';

import { useForgotPasswordMutation } from '@/queries/auth';

export const useForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const forgotPasswordMutation = useForgotPasswordMutation();

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      await forgotPasswordMutation.mutateAsync(value);
      setIsSuccess(true);
    },
  });

  return {
    form,
    forgotPasswordMutation,
    isSuccess,
  };
};
