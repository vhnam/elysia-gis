export type PaginationResponse<T> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export const makePaginationResponse = <T>(
  data: T[],
  page: number,
  limit: number
) => {
  return {
    data: data,
    page: page,
    limit: limit,
    total: data.length,
    totalPages: Math.ceil(data.length / limit),
  } satisfies PaginationResponse<T>;
};
