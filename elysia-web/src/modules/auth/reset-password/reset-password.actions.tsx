import { useForm } from '@tanstack/react-form';
import { useRouter, useSearch } from '@tanstack/react-router';
import { startTransition } from 'react';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

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
      try {
        await resetPasswordMutation.mutateAsync(value);
        startTransition(() => {
          router.navigate({ to: '/auth/login' });
        });
        toast.success('Password reset successfully');
      } catch (error) {
        toast.error(
          (error as AxiosError).message || 'Failed to send reset email',
        );
      }
    },
  });

  return {
    form,
    resetPasswordMutation,
  };
};
