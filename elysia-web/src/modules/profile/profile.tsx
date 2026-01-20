import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { useProfileActions } from './profile.actions';

export function Profile() {
  const { accountInfo, isLoading, error } = useProfileActions();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Loading your profile information…</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load profile. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!accountInfo) {
    return null;
  }

  const initials = accountInfo.user.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar size="lg" className="h-20 w-20">
              <AvatarImage
                src={accountInfo.user.image || undefined}
                alt={accountInfo.user.name}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">
                {accountInfo.user.name}
              </h2>
              <p className="text-muted-foreground">{accountInfo.user.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Email Verification
              </label>
              <div className="mt-1">
                {accountInfo.user.emailVerified ? (
                  <Badge variant="default">Verified</Badge>
                ) : (
                  <Badge variant="secondary">Not Verified</Badge>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                User ID
              </label>
              <p className="mt-1 text-sm font-mono">{accountInfo.user.id}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Account Created
              </label>
              <p className="mt-1 text-sm">
                {new Date(accountInfo.user.createdAt).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  },
                )}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Last Updated
              </label>
              <p className="mt-1 text-sm">
                {new Date(accountInfo.user.updatedAt).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  },
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
