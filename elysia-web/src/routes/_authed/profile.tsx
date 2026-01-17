import { createFileRoute } from '@tanstack/react-router';

import { Profile } from '@/modules/profile';

export const Route = createFileRoute('/_authed/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  return <Profile />;
}
