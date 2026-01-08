import { t } from "elysia";

import { _createUser } from "./user.service";

export namespace UserModel {
  export const createUserBody = () => {
    return t.Omit(_createUser, ["id", "createdAt"]);
  };

  export const createUserResponse = t.Object({
    id: t.String(),
    email: t.String({ format: "email" }),
    createdAt: t.String(),
  });

  export const createUserInvalid = t.Literal("Invalid email");
  export type createUserInvalid = typeof createUserInvalid.static;
}
