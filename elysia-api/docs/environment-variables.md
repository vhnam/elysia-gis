# Environment Variables

All environment variables are configured in a `.env` file in the root directory.

## Server Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode (`development`, `production`) | `development` |
| `API_PORT` | Server port | `4000` |

## Database Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_NAME` | Database name | `elysia-gis` |
| `DB_USERNAME` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `postgres` |

## JWT Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_SECRET` | JWT signing secret | `your-secret-key-change-in-production` |
| `JWT_EXPIRES_IN` | JWT expiration time | `7d` |

⚠️ **Important:** Always change `JWT_SECRET` in production to a strong, random value.

## Email Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `EMAIL_HOST` | SMTP server host | `smtp.gehenna.sh` |
| `EMAIL_PORT` | SMTP server port | `465` |
| `EMAIL_USERNAME` | SMTP username | `makoto` |
| `EMAIL_PASSWORD` | SMTP password | `12345678` |
| `FRONTEND_URL` | Frontend URL for email links | `http://localhost:3000` |

## Example .env File

```env
# Server
NODE_ENV=development
API_PORT=4000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=elysia-gis
DB_USERNAME=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# Email
EMAIL_HOST=smtp.example.com
EMAIL_PORT=465
EMAIL_USERNAME=your-email@example.com
EMAIL_PASSWORD=your-email-password
FRONTEND_URL=http://localhost:3000
```

## Security Notes

- Never commit `.env` files to version control
- Use different credentials for development and production
- Rotate secrets regularly in production
- Use environment-specific values for `FRONTEND_URL`

