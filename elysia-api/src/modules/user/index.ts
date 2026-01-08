import Elysia from "elysia";

export const user = new Elysia({
  prefix: "/users",
}).get("/", () => {
  return "Hello from Users";
});
