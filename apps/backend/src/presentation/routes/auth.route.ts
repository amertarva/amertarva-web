import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { LoginBody, RefreshBody } from "../../application/dtos/auth.dto";
import {
  loginUseCase,
  AuthError,
} from "../../application/use-cases/auth/login.usecase";
import { refreshUseCase } from "../../application/use-cases/auth/refresh.usecase";
import { SupabaseLordAdminRepository } from "../../infrastructure/database/supabase/lord-admin.repository";

const repo = new SupabaseLordAdminRepository();

// Route Auth
export const authRoute = new Elysia({ prefix: "/auth" })
  .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET!, exp: "8h" }))
  .use(jwt({ name: "refreshJwt", secret: process.env.JWT_SECRET!, exp: "30d" }))

  // Login
  .post(
    "/login",
    async ({ body, jwt, refreshJwt, set }) => {
      try {
        return await loginUseCase(
          repo,
          body.email,
          body.password,
          (id) => jwt.sign({ sub: id, type: "access" }),
          (id) => refreshJwt.sign({ sub: id, type: "refresh" }),
        );
      } catch {
        set.status = 401;
        return {
          error: "Email atau password salah",
          code: "INVALID_CREDENTIALS",
        };
      }
    },
    { body: LoginBody },
  )

  // Refresh
  .post(
    "/refresh",
    async ({ body, jwt, refreshJwt, set }) => {
      try {
        const payload = await refreshJwt.verify(body.refreshToken);
        if (!payload) throw new AuthError("INVALID_TOKEN");
        return await refreshUseCase(repo, payload as any, (id) =>
          jwt.sign({ sub: id, type: "access" }),
        );
      } catch {
        set.status = 401;
        return { error: "Token tidak valid", code: "INVALID_TOKEN" };
      }
    },
    { body: RefreshBody },
  );
