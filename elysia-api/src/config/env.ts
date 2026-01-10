export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  API_PORT: parseInt(process.env.API_PORT || '4000'),
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '5432'),
  DB_NAME: process.env.DB_NAME || 'elysia-gis',
  DB_USER: process.env.DB_USERNAME || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',

  EMAIL_HOST: process.env.EMAIL_HOST || 'sandbox.smtp.mailtrap.io',
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT || '2525'),
  EMAIL_USER: process.env.EMAIL_USER || '8aee4b89821b78',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || '3f24e828b9a449',

  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
} as const;
