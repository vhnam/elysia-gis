// Helper to get env var that works in both Bun and Node.js
const getEnv = (key: string, defaultValue: string): string => {
  if (typeof Bun !== 'undefined' && Bun.env[key]) {
    return Bun.env[key]!;
  }
  return process.env[key] || defaultValue;
};

export const env = {
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  JWT_SECRET: getEnv('JWT_SECRET', 'your-secret-key-change-in-production'),
  JWT_EXPIRES_IN: getEnv('JWT_EXPIRES_IN', '7d'),

  API_PORT: parseInt(getEnv('API_PORT', '4000')),
  DB_HOST: getEnv('DB_HOST', 'localhost'),
  DB_PORT: parseInt(getEnv('DB_PORT', '5432')),
  DB_NAME: getEnv('DB_NAME', 'elysia-gis'),
  DB_USER: getEnv('DB_USERNAME', 'postgres'),
  DB_PASSWORD: getEnv('DB_PASSWORD', 'postgres'),

  EMAIL_HOST: getEnv('EMAIL_HOST', 'smtp.gehenna.sh'),
  EMAIL_PORT: parseInt(getEnv('EMAIL_PORT', '465')),
  EMAIL_USERNAME: getEnv('EMAIL_USERNAME', 'makoto'),
  EMAIL_PASSWORD: getEnv('EMAIL_PASSWORD', '12345678'),

  FRONTEND_URL: getEnv('FRONTEND_URL', 'http://localhost:3000'),
} as const;
