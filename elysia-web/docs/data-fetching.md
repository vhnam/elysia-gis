# Data Fetching

This project uses [TanStack Query](https://tanstack.com/query) (formerly React Query) for data fetching, caching, and synchronization.

## Setup

TanStack Query is configured in `src/providers/query-provider.tsx` and integrated with TanStack Router in `src/router.tsx`.

## Query Hooks

Query hooks are located in `src/queries/`. Currently available:

### Authentication Queries

Located in `src/queries/auth/`:

- `useLoginMutation` - Sign in mutation
- `useForgotPasswordMutation` - Request password reset
- `useResetPasswordMutation` - Reset password

### Using Mutations

```tsx
import { useLoginMutation } from '@/queries/auth';

function LoginForm() {
  const loginMutation = useLoginMutation({
    onSuccess: (data) => {
      // Handle successful login
      console.log('Logged in:', data);
    },
    onError: (error) => {
      // Handle error
      console.error('Login failed:', error);
    },
  });

  const handleSubmit = (credentials) => {
    loginMutation.mutate(credentials);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

## API Client

The API client is configured in `src/utils/api.ts` using Axios:

```typescript
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
});
```

### Making API Calls

```tsx
import { api } from '@/utils/api';

// GET request
const response = await api.get('/users/me');
const user = response.data;

// POST request
const response = await api.post('/auth/sign-in', {
  username: 'user',
  password: 'password',
});
```

## Creating New Queries

### Query Hook

```tsx
// src/queries/users/user.queries.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/utils/api';

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    },
  });
};
```

### Using in Component

```tsx
import { useUser } from '@/queries/users/user.queries';

function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useUser(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{user.username}</div>;
}
```

## Server-Side Rendering (SSR)

TanStack Query is integrated with TanStack Router for SSR support. Data can be prefetched in route loaders:

```tsx
export const Route = createFileRoute('/users/$userId')({
  loader: async ({ context, params }) => {
    // Prefetch data on server
    await context.queryClient.prefetchQuery({
      queryKey: ['user', params.userId],
      queryFn: async () => {
        const response = await api.get(`/users/${params.userId}`);
        return response.data;
      },
    });
  },
  component: UserPage,
});
```

## Error Handling

Errors are automatically handled by TanStack Query. You can customize error handling:

```tsx
const query = useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
  retry: 3,
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  onError: (error) => {
    // Custom error handling
    toast.error('Failed to fetch data');
  },
});
```

## Caching

TanStack Query automatically caches data. Cache configuration:

- **staleTime**: How long data is considered fresh (default: 0)
- **cacheTime**: How long unused data stays in cache (default: 5 minutes)

```tsx
const query = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});
```

