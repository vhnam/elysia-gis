import { IconMap2 } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';

export const AppLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 px-1.5 md:px-0">
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <IconMap2 className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">Elysia GIS</span>
      </div>
    </Link>
  );
};
