import { createFileRoute, redirect } from '@tanstack/react-router';

import useAuthStore from '@/stores/auth';

export const Route = createFileRoute('/_authed')({
  beforeLoad: () => {
    const { token, user } = useAuthStore.getState();
    if (!token || !user) {
      throw redirect({ to: '/auth/sign-in', replace: true });
    }
  },
});
