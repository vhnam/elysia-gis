import { IconLogout, IconUserCircle } from '@tabler/icons-react';
import { Link, useRouter } from '@tanstack/react-router';
import { startTransition } from 'react';

import useAuthStore from '@/stores/auth';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import type { User } from '@/models';

const getAvatarPlaceholder = (user: User): string => {
  return `${user.name
    .split(' ')
    .map((word: string) => word.charAt(0))
    .join('')}`.toUpperCase();
};

interface UserAvatarProps {
  user: User;
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  const avatarPlaceholder = getAvatarPlaceholder(user);

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Avatar
            size="lg"
            className="cursor-pointer border-2 border-primary border-dashed"
          >
            {user.image && <AvatarImage src={user.image} alt={user.name} />}
            <AvatarFallback className="bg-primary text-primary-foreground">
              {avatarPlaceholder}
            </AvatarFallback>
          </Avatar>
        }
      />
      <TooltipContent>
        <p>
          {user.name}
          <br />
          {user.email}
        </p>
      </TooltipContent>
    </Tooltip>
  );
};

interface UserMenuProps {
  user: User;
}

const UserMenu = ({ user }: UserMenuProps) => {
  const router = useRouter();
  const { setToken, setUser } = useAuthStore();

  const handleLogout = () => {
    setToken(null);
    setUser(null);

    startTransition(() => {
      router.navigate({ to: '/auth/login' });
    });
  };

  const handleProfile = () => {
    // TODO: Navigate to profile page when implemented
    console.log('Navigate to profile');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleProfile}>
            <IconUserCircle />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} variant="destructive">
            <IconLogout />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LoginButton = () => {
  return (
    <Link to="/auth/login">
      <Button variant="default">Login</Button>
    </Link>
  );
};

export const MapUser = () => {
  const { user } = useAuthStore();

  return (
    <div className="absolute top-4 right-4 z-50">
      {user ? <UserMenu user={user} /> : <LoginButton />}
    </div>
  );
};
