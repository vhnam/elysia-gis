import { createFileRoute } from '@tanstack/react-router';

import { Auth } from '@/components/auth';

import { LoginForm } from '@/modules/auth/login';

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
});

function LoginPage() {
  return (
    <Auth>
      <LoginForm />
    </Auth>
  );
}
