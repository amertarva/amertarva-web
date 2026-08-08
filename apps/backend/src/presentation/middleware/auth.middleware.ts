import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";

// Guard JWT Lord Admin
export const authGuard = new Elysia({ name: "authGuard" })
  .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET!, exp: "8h" }))
  .derive({ as: "scoped" }, async ({ jwt, headers }) => {
    const header = headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return { adminId: null as string | null };
    }
    const payload = await jwt.verify(header.slice(7));
    if (!payload) {
      return { adminId: null as string | null };
    }
    return { adminId: payload.sub as string };
  })
  .onBeforeHandle({ as: "scoped" }, ({ adminId, set }) => {
    if (!adminId) {
      set.status = 401;
      return { error: "Unauthorized", code: "UNAUTHORIZED" };
    }
  });
