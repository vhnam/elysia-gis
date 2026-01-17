import { createFileRoute } from '@tanstack/react-router';

import { Auth } from '@/components/auth';

import { SignInForm } from '@/modules/auth/sign-in';

export const Route = createFileRoute('/auth/sign-in')({
  component: SignInPage,
});

function SignInPage() {
  return (
    <Auth>
      <SignInForm />
    </Auth>
  );
}
