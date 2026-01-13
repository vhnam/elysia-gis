import { IconMap2 } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

export const Auth = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <IconMap2 className="size-4" />
          </div>
          Elysia GIS
        </Link>
        {children}
      </div>
    </div>
  );
};
