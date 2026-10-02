import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import type { ISchoolRepository } from "../../../domain/repositories/school.repository";
import type { IEncryptionService } from "../../../domain/services/encryption.service";
import type { InitializeSchoolDto } from "../../dtos/school.dto";
import { toSchoolDetail } from "../../mappers/school.mapper";
import { SchoolError } from "./create-school.usecase";
import {
  executeTenantSql,
  executeTenantSqlMigration
} from "../../../infrastructure/database/supabase/provision-schema";

function generateSecurePassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*";
  const bytes = crypto.randomBytes(12);
  let password = "Amr_";
  for (let i = 0; i < bytes.length; i++) {
    password += chars[bytes[i] % chars.length];
  }
  return password;
}

export async function initializeSchoolUseCase(
  repo: ISchoolRepository,
  enc: IEncryptionService,
  schoolId: string,
  dto: InitializeSchoolDto
) {
  const school = await repo.findById(schoolId);
  if (!school) throw new SchoolError("NOT_FOUND");

  const targetEmail = (dto.superAdminEmail || school.superAdminEmail || "").trim();
  if (!targetEmail) {
    throw new SchoolError("MISSING_EMAIL");
  }

  // Generate atau gunakan password yang diberikan
  const targetPassword = dto.superAdminPassword?.trim() || generateSecurePassword();

  // Ambil dan dekripsi Supabase Teachers credentials
  let teachersUrl = "";
  let teachersKey = "";

  try {
    teachersUrl = enc.decrypt(school.supaTeachersUrl);
    teachersKey = enc.decrypt(school.supaTeachersKey);
  } catch (err: any) {
    await repo.update(schoolId, {
      initStatus: "FAILED",
      initError: "Gagal mendekripsi kredensial database sekolah",
    });
    throw new SchoolError("DECRYPTION_FAILED");
  }

  if (!teachersUrl || !teachersKey) {
    await repo.update(schoolId, {
      initStatus: "FAILED",
      initError: "Kredensial Supabase Guru belum dikonfigurasi",
    });
    throw new SchoolError("MISSING_CREDENTIALS");
  }

  // Tandai IN_PROGRESS
  await repo.update(schoolId, {
    initStatus: "IN_PROGRESS",
    initError: null,
    superAdminEmail: targetEmail,
  });

  try {
    // 1. Eksekusi Pembuatan Tabel Otomatis (DDL Migration) di Database Supabase Sekolah
    const migrationResult = await executeTenantSqlMigration(teachersUrl, teachersKey);

    // 2. Inisialisasi Supabase Client dengan Service Role Key
    const supabaseClient = createClient(teachersUrl, teachersKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // 2. Buat akun Super Admin di Supabase Auth
    let authUser = null;
    const { data: createData, error: createError } =
      await supabaseClient.auth.admin.createUser({
        email: targetEmail,
        password: targetPassword,
        email_confirm: true,
        user_metadata: {
          role: "SUPER_ADMIN",
          name: `Super Admin ${school.schoolName}`,
          school_id: school.schoolId,
        },
      });

    if (createError) {
      // Jika user sudah ada, update password dan konfirmasi email
      if (
        createError.message.toLowerCase().includes("already registered") ||
        createError.message.toLowerCase().includes("already exists") ||
        createError.status === 422
      ) {
        const { data: listData } = await supabaseClient.auth.admin.listUsers();
        const existingUser = listData?.users.find(
          (u) => u.email?.toLowerCase() === targetEmail.toLowerCase()
        );

        if (existingUser) {
          const { data: updateData, error: updateError } =
            await supabaseClient.auth.admin.updateUserById(existingUser.id, {
              password: targetPassword,
              email_confirm: true,
              user_metadata: {
                ...existingUser.user_metadata,
                role: "SUPER_ADMIN",
                name: `Super Admin ${school.schoolName}`,
                school_id: school.schoolId,
              },
            });
          if (updateError) throw updateError;
          authUser = updateData.user;
        } else {
          throw createError;
        }
      } else {
        throw createError;
      }
    } else {
      authUser = createData.user;
    }

    // 3. Upsert data ke tabel 'users' & 'school_admins' langsung via SQL
    if (authUser?.id) {
      const sanitizedName = `Super Admin ${school.schoolName}`.replace(/'/g, "''");
      const sanitizedEmail = targetEmail.replace(/'/g, "''");
      const passwordHash = await Bun.password.hash(targetPassword, {
        algorithm: "bcrypt",
        cost: 10,
      });

      const insertUserSql = `
        INSERT INTO users (id, email, full_name, role, password_hash)
        VALUES ('${authUser.id}', '${sanitizedEmail}', '${sanitizedName}', 'super_admin', '${passwordHash}')
        ON CONFLICT (id) DO UPDATE SET
          email = EXCLUDED.email,
          full_name = EXCLUDED.full_name,
          role = 'super_admin',
          password_hash = EXCLUDED.password_hash;

        DELETE FROM school_admins WHERE role = 'super_admin';
        INSERT INTO school_admins (email, name, role, source, is_active)
        VALUES ('${sanitizedEmail}', '${sanitizedName}', 'super_admin', 'registry', true);

        NOTIFY pgrst, 'reload schema';
      `;
      await executeTenantSql(teachersUrl, teachersKey, insertUserSql);
    }

    // 4. Update status inisialisasi di registry menjadi DONE
    const updated = await repo.update(schoolId, {
      initStatus: "DONE",
      initError: null,
      superAdminEmail: targetEmail,
    });

    return {
      success: true,
      school: toSchoolDetail(updated),
      superAdmin: {
        email: targetEmail,
        password: targetPassword,
        userId: authUser?.id || null,
        message: "Akun Super Admin berhasil dibuat dan database siap digunakan.",
      },
    };
  } catch (err: any) {
    const errorMsg = err.message || "Gagal menghubungkan atau inisialisasi Supabase sekolah";
    await repo.update(schoolId, {
      initStatus: "FAILED",
      initError: errorMsg,
    });
    throw new SchoolError(`INIT_FAILED: ${errorMsg}`);
  }
}
