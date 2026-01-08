import { users } from "./users.schema";

export const table = {
  users,
} as const;

export type Table = typeof table;
