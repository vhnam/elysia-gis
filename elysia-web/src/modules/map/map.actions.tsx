import { useRouter } from '@tanstack/react-router';
import { startTransition } from 'react';
import { toast } from 'sonner';

import { useSignOutMutation } from '@/queries/auth';

import useAuthStore from '@/stores/auth';

export const useMapActions = () => {
  const router = useRouter();
  const { setToken, setUser } = useAuthStore();
  const signOutMutation = useSignOutMutation();

  const resetAuth = () => {
    setToken(null);
    setUser(null);

    startTransition(() => {
      router.navigate({ to: '/auth/sign-in' });
    });

    toast.success('Signed out successfully');
  };

  const handleSignOut = () => {
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        resetAuth();
      },
      onError: () => {
        resetAuth();
      },
    });
  };

  return {
    signOutMutation,
    onSignOut: handleSignOut,
  };
};
