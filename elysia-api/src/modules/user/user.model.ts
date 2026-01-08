import { createInsertSchema } from "drizzle-typebox";
import { t } from "elysia";

import { table } from "../../database";

export namespace UserModel {
  export const createUserBody = () => {
    const schema = createInsertSchema(table.users, {
      email: t.String({ format: "email" }),
    });
    return t.Omit(schema, ["id", "salt", "createdAt"]);
  };

  export const createUserResponse = t.Object({
    id: t.String(),
    email: t.String({ format: "email" }),
    createdAt: t.String(),
  });

  export const createUserInvalid = t.Literal("Invalid email");
  export type createUserInvalid = typeof createUserInvalid.static;
}
