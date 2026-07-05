import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";

// Guard JWT Lord Admin
export const authGuard = new Elysia({ name: "authGuard" })
  .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET!, exp: "8h" }))
  .derive(async ({ jwt, headers, set }) => {
    const header = headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      set.status = 401;
      throw new Error("UNAUTHORIZED");
    }
    const payload = await jwt.verify(header.slice(7));
    if (!payload) {
      set.status = 401;
      throw new Error("UNAUTHORIZED");
    }
    return { adminId: payload.sub as string };
  });
