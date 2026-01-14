import { useForm } from '@tanstack/react-form';
import { useRouter } from '@tanstack/react-router';
import { startTransition } from 'react';

import { signInSchema } from '@/schemas/auth.schema';

import { useSignInMutation } from '@/queries/auth';

import useAuthStore from '@/stores/auth';

export const useSignInActions = () => {
  const router = useRouter();
  const signInMutation = useSignInMutation();
  const { setToken, setUser } = useAuthStore();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await signInMutation.mutateAsync(value);
      const { token, ...user } = response;
      setToken(response.token);
      setUser(user.user);

      startTransition(() => {
        router.navigate({ to: '/' });
      });
    },
  });

  return {
    form,
    signInMutation,
  };
};
