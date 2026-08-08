import { t } from "elysia";

const CredentialFieldsSchema = {
  supaTeachersUrl: t.String({ minLength: 0 }),
  supaTeachersKey: t.String({ minLength: 0 }),
  supaStudentsUrl: t.String({ minLength: 0 }),
  supaStudentsKey: t.String({ minLength: 0 }),
  supaClassesUrl: t.String({ minLength: 0 }),
  supaClassesKey: t.String({ minLength: 0 }),
  supaGradesUrl: t.String({ minLength: 0 }),
  supaGradesKey: t.String({ minLength: 0 }),
  astradbEndpoint: t.String({ minLength: 0 }),
  astradbToken: t.String({ minLength: 0 }),
  astradbNamespace: t.String({ minLength: 0 }),
  mongodbUri: t.String({ minLength: 0 }),
  mongodbDbName: t.String({ minLength: 0 }),
  tursoUrl: t.String({ minLength: 0 }),
  tursoAuthToken: t.String({ minLength: 0 }),
  nasUrl: t.String({ minLength: 0 }),
  nasUsername: t.String({ minLength: 0 }),
  nasPassword: t.String({ minLength: 0 }),
};

export const CreateSchoolBody = t.Object({
  schoolName: t.String({ minLength: 3 }),
  subdomainSlug: t.String({ pattern: "^[a-z0-9-]+$", minLength: 3 }),
  planType: t.Union([
    t.Literal("CLASSIC"),
    t.Literal("PRO"),
    t.Literal("PREMIUM"),
    t.Literal("CUSTOM"),
  ]),
  // Durasi sewa wajib diisi saat membuat sekolah (minimum 1 bulan)
  rentDurationMonths: t.Integer({
    minimum: 1,
    description: "Durasi penyewaan dalam bulan (minimum 1)",
  }),
  maxStorageGb: t.Integer({ minimum: 1, default: 5 }),
  storageAllocation: t.Array(t.String(), { default: [] }),
  ...CredentialFieldsSchema,
});
export type CreateSchoolDto = typeof CreateSchoolBody.static;

// Semua field optional — field kosong/tidak dikirim = tidak diubah
export const UpdateSchoolBody = t.Partial(
  t.Object({
    schoolName: t.String({ minLength: 3 }),
    planType: t.Union([
      t.Literal("CLASSIC"),
      t.Literal("PRO"),
      t.Literal("PREMIUM"),
      t.Literal("CUSTOM"),
    ]),
    status: t.Union([
      t.Literal("PENDING"),
      t.Literal("ACTIVE"),
      t.Literal("SUSPENDED"),
    ]),
    maxStorageGb: t.Integer({ minimum: 1, default: 5 }),
    storageAllocation: t.Array(t.String(), { default: [] }),
    // Set tanggal berakhir sewa secara manual (ISO 8601)
    rentEndDate: t.String({
      description: "Set tanggal berakhir sewa secara manual (ISO 8601, contoh: 2026-12-31T00:00:00Z)",
    }),
    ...CredentialFieldsSchema,
  }),
);
export type UpdateSchoolDto = typeof UpdateSchoolBody.static;

// Body untuk perpanjangan sewa
export const ExtendRentBody = t.Object({
  extendMonths: t.Integer({
    minimum: 1,
    description: "Tambah durasi sewa dalam bulan",
  }),
});
export type ExtendRentDto = typeof ExtendRentBody.static;
