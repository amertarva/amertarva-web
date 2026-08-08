export type PlanType = "CLASSIC" | "PRO" | "PREMIUM" | "CUSTOM";
export type SchoolStatus = "PENDING" | "ACTIVE" | "SUSPENDED";
export type InitStatus = "NOT_STARTED" | "IN_PROGRESS" | "DONE" | "FAILED";

// Computed dari rentEndDate — tidak disimpan di DB
export type RentStatus = "ACTIVE" | "EXPIRING_SOON" | "EXPIRED" | "NONE";

export interface School {
  schoolId: string;
  schoolName: string;
  subdomainSlug: string;
  planType: PlanType;
  status: SchoolStatus;
  maxStorageGb: number;
  storageAllocation: string[];

  // Durasi penyewaan
  rentDurationMonths: number | null;
  rentStartDate: string | null;
  rentEndDate: string | null;

  // Semua field di bawah disimpan TERENKRIPSI (AES-256-GCM)
  supaTeachersUrl: string;
  supaTeachersKey: string;
  supaStudentsUrl: string;
  supaStudentsKey: string;
  supaClassesUrl: string;
  supaClassesKey: string;
  supaGradesUrl: string;
  supaGradesKey: string;
  astradbEndpoint: string;
  astradbToken: string;
  astradbNamespace: string;
  mongodbUri: string;
  mongodbDbName: string;
  tursoUrl: string;
  tursoAuthToken: string;
  nasUrl: string;
  nasUsername: string;
  nasPassword: string;

  initStatus: InitStatus;
  initError: string | null;
  superAdminEmail: string | null;

  createdAt: string;
  updatedAt: string;
}

// Daftar 18 field kredensial — single source of truth, JANGAN duplikasi list ini
export const CREDENTIAL_FIELDS = [
  "supaTeachersUrl",
  "supaTeachersKey",
  "supaStudentsUrl",
  "supaStudentsKey",
  "supaClassesUrl",
  "supaClassesKey",
  "supaGradesUrl",
  "supaGradesKey",
  "astradbEndpoint",
  "astradbToken",
  "astradbNamespace",
  "mongodbUri",
  "mongodbDbName",
  "tursoUrl",
  "tursoAuthToken",
  "nasUrl",
  "nasUsername",
  "nasPassword",
] as const;

export type CredentialField = (typeof CREDENTIAL_FIELDS)[number];

/**
 * Hitung status sewa berdasarkan rentEndDate.
 * - NONE         : belum diset
 * - EXPIRED      : sudah melewati tanggal berakhir
 * - EXPIRING_SOON: akan habis dalam ≤ 7 hari
 * - ACTIVE       : masih aktif
 */
export function computeRentStatus(rentEndDate: string | null): RentStatus {
  if (!rentEndDate) return "NONE";
  const now = Date.now();
  const end = new Date(rentEndDate).getTime();
  const diffMs = end - now;
  if (diffMs <= 0) return "EXPIRED";
  if (diffMs <= 7 * 24 * 60 * 60 * 1000) return "EXPIRING_SOON";
  return "ACTIVE";
}

/**
 * Tambah bulan ke date — menjaga hari akhir bulan dengan benar.
 * Contoh: 31 Jan + 1 bulan = 28/29 Feb
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}
