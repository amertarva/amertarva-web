export type PlanType = "CLASSIC" | "PREMIUM" | "CUSTOM";
export type SchoolStatus = "PENDING" | "ACTIVE" | "SUSPENDED";
export type InitStatus = "NOT_STARTED" | "IN_PROGRESS" | "DONE" | "FAILED";

export interface School {
  schoolId: string;
  schoolName: string;
  subdomainSlug: string;
  planType: PlanType;
  status: SchoolStatus;
  maxStorageGb: number;
  storageAllocation: string[];

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
