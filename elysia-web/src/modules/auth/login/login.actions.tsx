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
      email: '',
      password: '',
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await loginMutation.mutateAsync(value);
      setToken(response.token);
      setUser({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        emailVerified: response.user.emailVerified,
        image: response.user.image,
        createdAt: response.user.createdAt,
        updatedAt: response.user.updatedAt,
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
