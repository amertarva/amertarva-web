import { Elysia } from "elysia";
import { authGuard } from "../middleware/auth.middleware";
import {
  CreateSchoolBody,
  UpdateSchoolBody,
  ExtendRentBody,
} from "../../application/dtos/school.dto";
import {
  createSchoolUseCase,
  SchoolError,
} from "../../application/use-cases/schools/create-school.usecase";
import { listSchoolsUseCase } from "../../application/use-cases/schools/list-schools.usecase";
import { getSchoolUseCase } from "../../application/use-cases/schools/get-school.usecase";
import { updateSchoolUseCase } from "../../application/use-cases/schools/update-school.usecase";
import { deleteSchoolUseCase } from "../../application/use-cases/schools/delete-school.usecase";
import { extendRentUseCase } from "../../application/use-cases/schools/extend-rent.usecase";
import { SupabaseSchoolRepository } from "../../infrastructure/database/supabase/school.repository";
import { AesGcmEncryptionService } from "../../infrastructure/crypto/aes-gcm.service";

const repo = new SupabaseSchoolRepository();
const enc = new AesGcmEncryptionService();

// Route Schools — semua endpoint WAJIB authGuard
export const schoolsRoute = new Elysia({ prefix: "/schools" })
  .use(authGuard)

  // List sekolah
  .get("/", async () => ({ data: await listSchoolsUseCase(repo) }))

  // Buat sekolah
  .post(
    "/",
    async ({ body, set }) => {
      try {
        return await createSchoolUseCase(repo, enc, body);
      } catch (e: any) {
        console.error("Error creating school:", e);
        if (e instanceof SchoolError && e.message === "SLUG_TAKEN") {
          set.status = 409;
          return { error: "Subdomain sudah dipakai", code: "SLUG_TAKEN" };
        }
        set.status = 500;
        return { error: "Gagal membuat sekolah", code: "INTERNAL_ERROR", details: e.message || String(e) };
      }
    },
    { body: CreateSchoolBody },
  )

  // Detail sekolah
  .get("/:id", async ({ params, set }) => {
    try {
      return await getSchoolUseCase(repo, params.id);
    } catch {
      set.status = 404;
      return { error: "Sekolah tidak ditemukan", code: "NOT_FOUND" };
    }
  })

  // Update sekolah
  .put(
    "/:id",
    async ({ params, body, set }) => {
      try {
        return await updateSchoolUseCase(repo, enc, params.id, body);
      } catch (e) {
        if (e instanceof SchoolError && e.message === "NOT_FOUND") {
          set.status = 404;
          return { error: "Sekolah tidak ditemukan", code: "NOT_FOUND" };
        }
        set.status = 500;
        return { error: "Gagal memperbarui sekolah", code: "INTERNAL_ERROR" };
      }
    },
    { body: UpdateSchoolBody },
  )

  // Nonaktifkan sekolah (soft delete → SUSPENDED)
  .delete("/:id", async ({ params, set }) => {
    try {
      await deleteSchoolUseCase(repo, params.id);
      return { success: true };
    } catch {
      set.status = 404;
      return { error: "Sekolah tidak ditemukan", code: "NOT_FOUND" };
    }
  })

  // Perpanjang durasi sewa
  .post(
    "/:id/extend-rent",
    async ({ params, body, set }) => {
      try {
        return await extendRentUseCase(repo, params.id, body.extendMonths);
      } catch (e) {
        if (e instanceof SchoolError && e.message === "NOT_FOUND") {
          set.status = 404;
          return { error: "Sekolah tidak ditemukan", code: "NOT_FOUND" };
        }
        set.status = 500;
        return { error: "Gagal memperpanjang sewa", code: "INTERNAL_ERROR" };
      }
    },
    { body: ExtendRentBody },
  );
