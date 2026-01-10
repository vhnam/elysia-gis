import { useForm } from '@tanstack/react-form';
import { useRouter } from '@tanstack/react-router';
import { startTransition } from 'react';

import { loginSchema } from '@/schemas/auth.schema';

import { useLoginMutation } from '@/queries/auth';

export const useLogin = () => {
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      await loginMutation.mutateAsync(value);
      startTransition(() => {
        router.navigate({ to: '/' });
      });
    },
  });

  return {
    form,
    loginMutation,
  };
};
