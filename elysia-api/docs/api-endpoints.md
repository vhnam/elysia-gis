# API Endpoints

## Base URL

All API endpoints are prefixed with `/api/v1`.

## Health Check

### GET /api/v1/health

Returns server status and timestamp.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Authentication

### POST /api/v1/auth/sign-in

Sign in with username and password.

**Request:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "username": "string",
  "userId": "string",
  "token": "jwt_token"
}
```

**Note:** The token is also set as an HTTP-only cookie named `session`.

### POST /api/v1/auth/forgot-password

Request a password reset email.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Password reset email sent"
}
```

Sends a password reset email to the user with a reset token.

### POST /api/v1/auth/reset-password

Reset password using token from email.

**Request:**
```json
{
  "token": "reset_token_from_email",
  "password": "new_password"
}
```

**Response:**
```json
{
  "message": "Password reset successfully"
}
```

## Users

All user endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### GET /api/v1/users

List users with pagination and search.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `search` (optional): Search term for username

**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "username": "string",
      "email": "string",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "page": 1,
  "limit": 10,
  "total": 100,
  "totalPages": 10
}
```

### POST /api/v1/users

Create a new user.

**Request:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### GET /api/v1/users/:id

Get user by ID.

**Response:**
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### GET /api/v1/users/me

Get current authenticated user.

**Response:**
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error Type",
  "message": "Human readable message",
  "statusCode": 400
}
```

Common status codes:
- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## OpenAPI Documentation

For interactive API documentation, visit:

```
http://localhost:4000/openapi
```

