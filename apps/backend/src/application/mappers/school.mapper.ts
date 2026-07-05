import {
  CREDENTIAL_FIELDS,
  type School,
} from "../../domain/entities/school.entity";
import type { IEncryptionService } from "../../domain/services/encryption.service";

// Enkripsi semua field kredensial yang ada di input
export function encryptCredentials(
  enc: IEncryptionService,
  input: Record<string, any>,
) {
  const result: Record<string, string> = {};
  for (const field of CREDENTIAL_FIELDS) {
    if (input[field] !== undefined && input[field] !== "") {
      result[field] = enc.encrypt(input[field]);
    }
  }
  return result;
}

// School -> SchoolSummary (untuk list, tanpa kredensial)
export function toSchoolSummary(school: School) {
  return {
    schoolId: school.schoolId,
    schoolName: school.schoolName,
    subdomainSlug: school.subdomainSlug,
    planType: school.planType,
    status: school.status,
    maxStorageGb: school.maxStorageGb,
    storageAllocation: school.storageAllocation,
    initStatus: school.initStatus,
    createdAt: school.createdAt,
  };
}

// School -> SchoolDetail (isConfigured flag per kredensial, tanpa raw value)
export function toSchoolDetail(school: School) {
  const has = (...keys: (keyof School)[]) => keys.every((k) => !!school[k]);
  return {
    schoolId: school.schoolId,
    schoolName: school.schoolName,
    subdomainSlug: school.subdomainSlug,
    planType: school.planType,
    status: school.status,
    maxStorageGb: school.maxStorageGb,
    storageAllocation: school.storageAllocation,
    initStatus: school.initStatus,
    initError: school.initError,
    superAdminEmail: school.superAdminEmail,
    createdAt: school.createdAt,
    updatedAt: school.updatedAt,
    credentials: {
      supaTeachers: { isConfigured: has("supaTeachersUrl", "supaTeachersKey") },
      supaStudents: { isConfigured: has("supaStudentsUrl", "supaStudentsKey") },
      supaClasses: { isConfigured: has("supaClassesUrl", "supaClassesKey") },
      supaGrades: { isConfigured: has("supaGradesUrl", "supaGradesKey") },
      astradb: {
        isConfigured: has(
          "astradbEndpoint",
          "astradbToken",
          "astradbNamespace",
        ),
      },
      mongodb: { isConfigured: has("mongodbUri", "mongodbDbName") },
      turso: { isConfigured: has("tursoUrl", "tursoAuthToken") },
      nas: { isConfigured: has("nasUrl", "nasUsername", "nasPassword") },
    },
  };
}
