# Routing

This project uses [TanStack Router](https://tanstack.com/router) for file-based routing.

## File-Based Routing

Routes are automatically generated from files in the `src/routes/` directory. The file structure determines the URL structure.

### Route Structure

```
src/routes/
├── __root.tsx          # Root route (layout)
├── index.tsx           # / (home page)
└── auth/
    ├── login.tsx       # /auth/login
    ├── forgot-password.tsx  # /auth/forgot-password
    └── reset-password.tsx    # /auth/reset-password
```

### Creating a New Route

1. Create a new file in `src/routes/`:

```tsx
// src/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return <div>About Page</div>;
}
```

2. The route will be available at `/about`

### Nested Routes

Create a folder with an `index.tsx` file:

```
src/routes/
└── dashboard/
    ├── index.tsx       # /dashboard
    └── settings.tsx   # /dashboard/settings
```

### Route Parameters

Use `$` prefix for dynamic segments:

```tsx
// src/routes/users/$userId.tsx
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/users/$userId')({
  component: UserPage,
});

function UserPage() {
  const { userId } = Route.useParams();
  return <div>User: {userId}</div>;
}
```

### Route Loading

Use `loader` for data fetching:

```tsx
export const Route = createFileRoute('/users/$userId')({
  loader: async ({ params }) => {
    const user = await fetchUser(params.userId);
    return { user };
  },
  component: UserPage,
});

function UserPage() {
  const { user } = Route.useLoaderData();
  return <div>{user.name}</div>;
}
```

## Route Generation

After adding or modifying routes, the route tree is automatically generated. If needed, you can regenerate it:

```bash
# The route tree is generated automatically during dev/build
# Manual regeneration is rarely needed
```

The generated route tree is in `src/routeTree.gen.ts`.

## Navigation

### Using Link Component

```tsx
import { Link } from '@tanstack/react-router';

<Link to="/auth/login">Login</Link>;
```

### Programmatic Navigation

```tsx
import { useNavigate } from '@tanstack/react-router';

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: '/auth/login' });
  };

  return <button onClick={handleClick}>Go to Login</button>;
}
```

## Route Context

Routes can access context from the router:

```tsx
function MyComponent() {
  const context = Route.useRouteContext();
  // Access shared context
}
```

Context is set up in `src/router.tsx` and includes the TanStack Query client.
