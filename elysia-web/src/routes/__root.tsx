import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

import { ErrorBoundary } from '@/components/app';

import appCss from '@/styles.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Elysia GIS',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  notFoundComponent: () => <p>Page not found</p>,

  shellComponent: RootDocument,
});

function RootDocument({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ErrorBoundary>
          {children}
          <Toaster />
        </ErrorBoundary>
        <Scripts />
      </body>
    </html>
  );
}
