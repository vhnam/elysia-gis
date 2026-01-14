import { userSchema } from './user.schema';

export type User = typeof userSchema.$inferSelect;
export type NewUser = typeof userSchema.$inferInsert;
