import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import {
  LoginBody,
  RefreshBody,
  UpdateProfileBody,
  UpdatePasswordBody,
} from "../../application/dtos/auth.dto";
import {
  loginUseCase,
  AuthError,
} from "../../application/use-cases/auth/login.usecase";
import { refreshUseCase } from "../../application/use-cases/auth/refresh.usecase";
import { getMeUseCase } from "../../application/use-cases/auth/get-me.usecase";
import { updateProfileUseCase } from "../../application/use-cases/auth/update-profile.usecase";
import { updatePasswordUseCase } from "../../application/use-cases/auth/update-password.usecase";
import { SupabaseLordAdminRepository } from "../../infrastructure/database/supabase/lord-admin.repository";
import { authGuard } from "../middleware/auth.middleware";

const repo = new SupabaseLordAdminRepository();
const jwtSecret =
  process.env.JWT_SECRET || "fallback_jwt_secret_please_set_in_vercel_env";

if (!process.env.JWT_SECRET) {
  console.warn(
    "[Auth Route Warning] JWT_SECRET belum diset di Environment Variables!",
  );
}

// Route Auth
export const authRoute = new Elysia({ prefix: "/auth" })
  .use(jwt({ name: "jwt", secret: jwtSecret, exp: "1h" }))
  .use(jwt({ name: "refreshJwt", secret: jwtSecret, exp: "30d" }))

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
  )

  // Protected Profile & Settings Endpoints
  .guard({
    beforeHandle: [authGuard as any],
  }, (app) =>
    app
      // Get current admin info
      .get("/me", async ({ adminId, set }: any) => {
        try {
          return await getMeUseCase(repo, adminId);
        } catch {
          set.status = 404;
          return { error: "Admin tidak ditemukan", code: "NOT_FOUND" };
        }
      })

      // Update Profile (Name, Email)
      .patch(
        "/profile",
        async ({ adminId, body, set }: any) => {
          try {
            return await updateProfileUseCase(repo, adminId, body);
          } catch (e: any) {
            console.error("[AuthRoute] Error updating profile:", e);
            if (e.message === "EMAIL_ALREADY_IN_USE") {
              set.status = 409;
              return { error: "Email sudah digunakan oleh akun lain", code: "EMAIL_TAKEN" };
            }
            set.status = 500;
            return { error: e.message || "Gagal memperbarui profil", code: "INTERNAL_ERROR" };
          }
        },
        { body: UpdateProfileBody }
      )

      // Update Password
      .patch(
        "/password",
        async ({ adminId, body, set }: any) => {
          try {
            return await updatePasswordUseCase(repo, adminId, body);
          } catch (e: any) {
            console.error("[AuthRoute] Error updating password:", e);
            if (e.message === "INVALID_CURRENT_PASSWORD") {
              set.status = 400;
              return { error: "Kata sandi saat ini tidak sesuai", code: "INVALID_CURRENT_PASSWORD" };
            }
            if (e.message === "PASSWORD_TOO_SHORT") {
              set.status = 400;
              return { error: "Kata sandi baru minimal 8 karakter", code: "PASSWORD_TOO_SHORT" };
            }
            set.status = 500;
            return { error: e.message || "Gagal memperbarui kata sandi", code: "INTERNAL_ERROR" };
          }
        },
        { body: UpdatePasswordBody }
      )
  );
