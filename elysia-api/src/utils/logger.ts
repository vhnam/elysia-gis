import pino from 'pino';

import { env } from '@/config/env';

// Check if we're in Docker (no TTY, explicit Docker env, or running in container)
// In Docker, we want structured JSON logs, not pretty-printed logs
const isDocker =
  !process.stdout.isTTY ||
  process.env.DOCKER === 'true' ||
  process.env.IN_DOCKER === 'true' ||
  Boolean(process.env.BUN_RUNTIME_TRANSPILER); // Bun in Docker often has this
const isDevelopment = env.NODE_ENV === 'development';
const isLocalDev = isDevelopment && !isDocker && process.stdout.isTTY;

// Create logger config
// Only use pino-pretty in local development (not in Docker/production)
const loggerConfig: pino.LoggerOptions = {
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
};

// Add pino-pretty transport ONLY in local development
// In Docker/production, use structured JSON logs (better for log aggregation)
if (isLocalDev) {
  loggerConfig.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  };
}

const logger = pino(loggerConfig);

export default logger;
