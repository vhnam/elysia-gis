import { createFileRoute } from '@tanstack/react-router';

import { Auth } from '@/components/auth';

import { ResetPasswordForm } from '@/modules/auth/reset-password';

type ResetPasswordSearch = {
  token: string;
};

export const Route = createFileRoute('/auth/reset-password')({
  component: ResetPasswordPage,
  validateSearch: (search: Record<string, unknown>): ResetPasswordSearch => ({
    token: (search.token as string) || '',
  }),
});

function ResetPasswordPage() {
  return (
    <Auth>
      <ResetPasswordForm />
    </Auth>
  );
}
