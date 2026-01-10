import { useForm } from '@tanstack/react-form';
import { useRouter, useSearch } from '@tanstack/react-router';

import { resetPasswordSchema } from '@/schemas/auth.schema';

import { useResetPasswordMutation } from '@/queries/auth';

export const useResetPassword = () => {
  const router = useRouter();
  const { token } = useSearch({ from: '/auth/reset-password' });

  const resetPasswordMutation = useResetPasswordMutation();

  const form = useForm({
    defaultValues: {
      token,
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      await resetPasswordMutation.mutateAsync(value);
      router.navigate({ to: '/auth/login' });
    },
  });

  return {
    form,
    resetPasswordMutation,
  };
};
