# Authentication

The application implements JWT-based authentication with the following flows:

## Authentication Flows

### 1. Login

**Route:** `/auth/login`

Users can sign in with their username and password. Upon successful authentication:

- JWT token is received from the API
- Token is stored (handled by the API via HTTP-only cookie)
- User is redirected to the home page

**Implementation:**

- Component: `src/modules/auth/login/login.tsx`
- Mutation: `useLoginMutation` from `src/queries/auth/auth.mutation.ts`

### 2. Forgot Password

**Route:** `/auth/forgot-password`

Users can request a password reset by providing their email address. An email with a reset token will be sent.

**Implementation:**

- Component: `src/modules/auth/forgot-password/forgot-password.tsx`
- Mutation: `useForgotPasswordMutation`

### 3. Reset Password

**Route:** `/auth/reset-password`

Users can reset their password using the token received via email.

**Implementation:**

- Component: `src/modules/auth/reset-password/reset-password.tsx`
- Mutation: `useResetPasswordMutation`

## API Integration

All authentication requests are made through the API client configured in `src/utils/api.ts`:

```typescript
import { api } from '@/utils/api';

// Example: Login
const response = await api.post('/auth/sign-in', {
  username: 'user',
  password: 'password',
});
```

## Authentication State

Authentication state is managed through:

1. **Session Cookie**: The API sets an HTTP-only cookie named `session` containing the JWT token
2. **Axios Interceptors**: The API client automatically includes cookies in requests
3. **Protected Routes**: Routes can check authentication status via API calls

## Protected Routes

To protect a route, check authentication status in the route loader:

```tsx
export const Route = createFileRoute('/dashboard')({
  loader: async () => {
    // Check if user is authenticated
    try {
      const response = await api.get('/users/me');
      return { user: response.data };
    } catch (error) {
      // Redirect to login if not authenticated
      throw redirect({ to: '/auth/login' });
    }
  },
  component: DashboardPage,
});
```

## Logout

To implement logout:

1. Clear the session cookie (or call a logout endpoint if available)
2. Redirect to login page

```tsx
import { useNavigate } from '@tanstack/react-router';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Clear session (cookie is handled by API)
    // Or call logout endpoint if available
    navigate({ to: '/auth/login' });
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

## Form Validation

Authentication forms use Zod schemas for validation:

- `src/schemas/auth.schema.ts` - Validation schemas for auth forms

Forms are built with TanStack Form for type-safe form handling.
