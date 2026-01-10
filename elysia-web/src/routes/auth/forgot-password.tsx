import { createFileRoute } from '@tanstack/react-router';

import { Auth } from '@/components/auth';

import { ForgotPasswordForm } from '@/modules/auth/forgot-password';

export const Route = createFileRoute('/auth/forgot-password')({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <Auth>
      <ForgotPasswordForm />
    </Auth>
  );
}
