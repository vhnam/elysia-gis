import { useForm } from '@tanstack/react-form';
import { useRouter } from '@tanstack/react-router';
import { startTransition } from 'react';

import { loginSchema } from '@/schemas/auth.schema';

import { useLoginMutation } from '@/queries/auth';

import useAuthStore from '@/stores/auth';

export const useLogin = () => {
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const { setToken, setUser } = useAuthStore();

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await loginMutation.mutateAsync(value);
      setToken(response.token);
      setUser({
        id: response.id,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        username: response.username,
      });

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
