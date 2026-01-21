# Authentication

The API uses JWT (JSON Web Tokens) for authentication.

## Getting a Token

To authenticate, call the `/api/v1/auth/sign-in` endpoint with valid credentials:

```bash
curl -X POST http://localhost:4000/api/v1/auth/sign-in \
  -H "Content-Type: application/json" \
  -d '{
    "username": "your_username",
    "password": "your_password"
  }'
```

The response includes a `token` field, and the token is also automatically set as an HTTP-only cookie named `session`.

## Using the Token

### Authorization Header

Include the JWT token in the Authorization header for protected endpoints:

```
Authorization: Bearer <your_jwt_token>
```

### Session Cookie

Alternatively, the session cookie is automatically sent with requests if you're using a browser or cookie-aware HTTP client.

## Protected Endpoints

All endpoints under `/api/v1/users` require authentication. The following endpoints are public:

- `GET /api/v1/health`
- `POST /api/v1/auth/sign-in`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`

## Token Expiration

By default, JWT tokens expire after 7 days. This can be configured via the `JWT_EXPIRES_IN` environment variable.

## Password Reset Flow

1. User requests password reset via `/api/v1/auth/forgot-password`
2. System sends email with reset token
3. User submits new password with token via `/api/v1/auth/reset-password`
4. Password is updated and token is invalidated

See [Email Configuration](./email.md) for email setup.
