export const env = {
  NODE_ENV: Bun.env.NODE_ENV || 'development',
  JWT_SECRET: Bun.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRES_IN: Bun.env.JWT_EXPIRES_IN || '7d',

  API_PORT: parseInt(Bun.env.API_PORT || '4000'),
  DB_HOST: Bun.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(Bun.env.DB_PORT || '5432'),
  DB_NAME: Bun.env.DB_NAME || 'elysia-gis',
  DB_USER: Bun.env.DB_USERNAME || 'postgres',
  DB_PASSWORD: Bun.env.DB_PASSWORD || 'postgres',

  EMAIL_HOST: Bun.env.EMAIL_HOST || 'smtp.gehenna.sh',
  EMAIL_PORT: parseInt(Bun.env.EMAIL_PORT || '465'),
  EMAIL_USERNAME: Bun.env.EMAIL_USERNAME || 'makoto',
  EMAIL_PASSWORD: Bun.env.EMAIL_PASSWORD || '12345678',

  FRONTEND_URL: Bun.env.FRONTEND_URL || 'http://localhost:3000',
} as const;
