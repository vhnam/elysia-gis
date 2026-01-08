// Standard success response
export interface SuccessResponse<T = unknown> {
  success: true;
  data: T;
}

// Standard pagination response (for documentation)
export interface PaginationResponse<T = unknown> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Helper to create success response
export const success = <T>(data: T): SuccessResponse<T> => ({
  success: true,
  data,
});
