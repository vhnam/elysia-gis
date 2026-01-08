import { Elysia } from 'elysia';

export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}

export const errorHandler = new Elysia({
  name: 'error-handler',
}).onError(({ code, error, set }) => {
  // Handle validation errors
  if (code === 'VALIDATION') {
    set.status = 400;
    return {
      success: false,
      error: 'Validation Error',
      message: error.message,
      statusCode: 400,
    } satisfies ErrorResponse;
  }

  // Handle not found errors
  if (code === 'NOT_FOUND') {
    set.status = 404;
    return {
      success: false,
      error: 'Not Found',
      message: 'The requested resource was not found',
      statusCode: 404,
    } satisfies ErrorResponse;
  }

  // Handle parse errors
  if (code === 'PARSE') {
    set.status = 400;
    return {
      success: false,
      error: 'Parse Error',
      message: 'Invalid request body',
      statusCode: 400,
    } satisfies ErrorResponse;
  }

  // Handle unknown errors
  if (code === 'UNKNOWN') {
    set.status = 500;
    return {
      success: false,
      error: 'Internal Server Error',
      message: error.message || 'An unexpected error occurred',
      statusCode: 500,
    } satisfies ErrorResponse;
  }

  // Default error response
  const statusCode = set.status || 500;
  return {
    success: false,
    error: (error as Error).name || 'Error',
    message: (error as Error).message || 'An error occurred',
    statusCode: statusCode as number,
  } satisfies ErrorResponse;
});
