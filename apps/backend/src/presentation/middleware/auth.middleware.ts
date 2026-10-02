import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { SupabaseSchoolRepository } from "../../infrastructure/database/supabase/school.repository";

const schoolRepo = new SupabaseSchoolRepository();
const jwtSecret =
  process.env.JWT_SECRET || "fallback_jwt_secret_please_set_in_vercel_env";

// Guard JWT Lord Admin + Per-School Server API Key (M2M)
export const authGuard = new Elysia({ name: "authGuard" })
  .use(jwt({ name: "jwt", secret: jwtSecret, exp: "1h" }))
  .derive({ as: "scoped" }, async ({ jwt, headers }) => {
    const header = headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return { adminId: null as string | null };
    }
    const token = header.slice(7);

    // 1. Cek Per-School Server API Key (Kunci Unik Per Sekolah — Permanen, Tidak Pernah Expired)
   if (token.startsWith("amr_sch_")) {
      const school = await schoolRepo.findByServerApiKey(token);
      if (school) {
        return { adminId: `server:${school.schoolId}` };
      }
      return { adminId: null as string | null };
    }

    // 2. Cek JWT user session biasa (Login Lord Admin via Browser)
    const payload = await jwt.verify(token);
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
