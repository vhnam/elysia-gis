import { tableUsers } from './user.table';

export type User = typeof tableUsers.$inferSelect;
export type NewUser = typeof tableUsers.$inferInsert;
