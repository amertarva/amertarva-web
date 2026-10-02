import { Elysia, t } from "elysia";
import { authGuard } from "../middleware/auth.middleware";
import {
  CreateSchoolBody,
  UpdateSchoolBody,
  ExtendRentBody,
  UpdateSchoolStatusBody,
  SetCustomDomainBody,
  InitializeSchoolBody,
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
import { updateSchoolStatusUseCase } from "../../application/use-cases/schools/update-status.usecase";
import { initializeSchoolUseCase } from "../../application/use-cases/schools/initialize-school.usecase";
import {
  setCustomDomainUseCase,
  verifyCustomDomainUseCase,
  removeCustomDomainUseCase,
} from "../../application/use-cases/schools/custom-domain.usecase";
import { SupabaseSchoolRepository } from "../../infrastructure/database/supabase/school.repository";
import { AesGcmEncryptionService } from "../../infrastructure/crypto/aes-gcm.service";
import { computeRentStatus } from "../../domain/entities/school.entity";

const repo = new SupabaseSchoolRepository();
const enc = new AesGcmEncryptionService();

// Route Schools
export const schoolsRoute = new Elysia({ prefix: "/schools" })
  // 1. PUBLIC & INTERNAL ENDPOINTS (Tanpa AuthGuard untuk Client & Web Server)
  
  // Public Status Endpoint untuk Frontend Web Sekolah / Gateway
  .get(
    "/public/status",
    async ({ query, set }) => {
      const { host, slug, id } = query;
      let school = null;

      if (id) {
        school = await repo.findById(id);
      } else if (slug) {
        school = await repo.findBySlug(slug);
      } else if (host) {
        const cleanHost = host.split(":")[0].toLowerCase();
        const rootDomain = (process.env.ROOT_DOMAIN || "amertarva.com").toLowerCase();
        if (cleanHost.endsWith(`.${rootDomain}`)) {
          const extractedSlug = cleanHost.replace(`.${rootDomain}`, "");
          school = await repo.findBySlug(extractedSlug);
        } else if (cleanHost.endsWith(".localhost")) {
          const extractedSlug = cleanHost.replace(".localhost", "");
          school = await repo.findBySlug(extractedSlug);
        } else {
          school = await repo.findByCustomDomain(cleanHost);
        }
      }

      if (!school) {
        set.status = 404;
        return {
          status: false,
          code: "NOT_FOUND",
          message: "Institusi / sekolah tidak ditemukan di sistem Amertarva.",
        };
      }

      const rentStatus = computeRentStatus(school.rentEndDate);
      const isSuspended = school.status === "SUSPENDED" || rentStatus === "EXPIRED";

      return {
        status: true,
        schoolId: school.schoolId,
        schoolName: school.schoolName,
        subdomainSlug: school.subdomainSlug,
        customDomain: school.customDomain,
        tenantStatus: isSuspended ? "SUSPENDED" : school.status,
        suspensionReason: school.suspensionReason || (rentStatus === "EXPIRED" ? "SUBSCRIPTION_EXPIRED" : null),
        suspensionNotice: school.suspensionNotice || "Sistem e-learning untuk institusi ini sedang ditangguhkan sementara waktu. Silakan hubungi pihak pengelola atau administrator institusi Anda.",
        supportContact: "support@amertarva.com",
      };
    },
    {
      query: t.Object({
        host: t.Optional(t.String()),
        slug: t.Optional(t.String()),
        id: t.Optional(t.String()),
      }),
    }
  )

  // Internal Verify Domain Endpoint (Khusus Reverse Proxy Caddy / On-Demand TLS)
  .get(
    "/internal/verify-domain",
    async ({ query, set }) => {
      const domain = query.domain?.toLowerCase().trim();
      if (!domain) {
        set.status = 400;
        return "Domain parameter required";
      }

      const school = await repo.findByCustomDomain(domain);
      if (school && school.status === "ACTIVE") {
        set.status = 200;
        return "OK";
      }

      set.status = 404;
      return "Domain not allowed";
    },
    {
      query: t.Object({
        domain: t.String(),
      }),
    }
  )

  // =========================================================================
  // 2. PROTECTED ENDPOINTS (Lord Admin Dashboard)
  // =========================================================================
  .guard({
    beforeHandle: [authGuard as any],
  }, (app) =>
    app
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

      // Ambil Server API Key sekolah — untuk disalin ke .env Server Go Sekolah
      .get("/:id/api-key", async ({ params, set }) => {
        const school = await repo.findById(params.id);
        if (!school) {
          set.status = 404;
          return { error: "Sekolah tidak ditemukan", code: "NOT_FOUND" };
        }
        return {
          schoolId: school.schoolId,
          schoolName: school.schoolName,
          serverApiKey: school.serverApiKey,
          hint: "Salin nilai serverApiKey ke AMERTARVA_API_TOKEN di .env Server Go Sekolah.",
        };
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

      // Update Status Sekolah (On/Off / Suspend / Maintenance)
      .patch(
        "/:id/status",
        async ({ params, body, set }) => {
          try {
            return await updateSchoolStatusUseCase(repo, params.id, body as any);
          } catch (e) {
            if (e instanceof SchoolError && e.message === "NOT_FOUND") {
              set.status = 404;
              return { error: "Sekolah tidak ditemukan", code: "NOT_FOUND" };
            }
            set.status = 500;
            return { error: "Gagal memperbarui status sekolah", code: "INTERNAL_ERROR" };
          }
        },
        { body: UpdateSchoolStatusBody }
      )

      // Set Custom Domain
      .post(
        "/:id/custom-domain",
        async ({ params, body, set }) => {
          try {
            return await setCustomDomainUseCase(repo, params.id, body.customDomain);
          } catch (e) {
            if (e instanceof SchoolError && e.message === "DOMAIN_TAKEN") {
              set.status = 409;
              return { error: "Custom domain sudah digunakan oleh sekolah lain", code: "DOMAIN_TAKEN" };
            }
            if (e instanceof SchoolError && e.message === "NOT_FOUND") {
              set.status = 404;
              return { error: "Sekolah tidak ditemukan", code: "NOT_FOUND" };
            }
            set.status = 500;
            return { error: "Gagal menyetel custom domain", code: "INTERNAL_ERROR" };
          }
        },
        { body: SetCustomDomainBody }
      )

      // Verifikasi DNS Custom Domain
      .post(
        "/:id/verify-domain",
        async ({ params, set }) => {
          try {
            return await verifyCustomDomainUseCase(repo, params.id);
          } catch (e) {
            if (e instanceof SchoolError && e.message === "NOT_FOUND") {
              set.status = 404;
              return { error: "Sekolah tidak ditemukan", code: "NOT_FOUND" };
            }
            if (e instanceof SchoolError && e.message === "NO_CUSTOM_DOMAIN") {
              set.status = 400;
              return { error: "Sekolah belum memiliki custom domain yang didaftarkan", code: "NO_CUSTOM_DOMAIN" };
            }
            set.status = 500;
            return { error: "Gagal verifikasi DNS", code: "INTERNAL_ERROR" };
          }
        }
      )

      // Hapus Custom Domain
      .delete(
        "/:id/custom-domain",
        async ({ params, set }) => {
          try {
            return await removeCustomDomainUseCase(repo, params.id);
          } catch (e) {
            if (e instanceof SchoolError && e.message === "NOT_FOUND") {
              set.status = 404;
              return { error: "Sekolah tidak ditemukan", code: "NOT_FOUND" };
            }
            set.status = 500;
            return { error: "Gagal menghapus custom domain", code: "INTERNAL_ERROR" };
          }
        }
      )

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
      )

      // Inisialisasi Database Tenant & Buat Akun Super Admin Otomatis
      .post(
        "/:id/initialize",
        async ({ params, body, set }) => {
          try {
            return await initializeSchoolUseCase(repo, enc, params.id, body);
          } catch (e: any) {
            if (e instanceof SchoolError) {
              if (e.message === "NOT_FOUND") {
                set.status = 404;
                return { error: "Sekolah tidak ditemukan", code: "NOT_FOUND" };
              }
              if (e.message === "MISSING_EMAIL") {
                set.status = 400;
                return { error: "Email Super Admin harus diisi", code: "MISSING_EMAIL" };
              }
              if (e.message === "MISSING_CREDENTIALS" || e.message === "DECRYPTION_FAILED") {
                set.status = 400;
                return { error: "Kredensial database sekolah belum lengkap atau tidak valid", code: e.message };
              }
            }
            set.status = 500;
            return { error: "Gagal inisialisasi database sekolah", code: "INIT_ERROR", details: e.message || String(e) };
          }
        },
        { body: InitializeSchoolBody },
      )
  );

