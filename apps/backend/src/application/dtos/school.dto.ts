import { t } from "elysia";

const CredentialFieldsSchema = {
  supaTeachersUrl: t.String({ minLength: 1 }),
  supaTeachersKey: t.String({ minLength: 1 }),
  supaStudentsUrl: t.String({ minLength: 1 }),
  supaStudentsKey: t.String({ minLength: 1 }),
  supaClassesUrl: t.String({ minLength: 1 }),
  supaClassesKey: t.String({ minLength: 1 }),
  supaGradesUrl: t.String({ minLength: 1 }),
  supaGradesKey: t.String({ minLength: 1 }),
  astradbEndpoint: t.String({ minLength: 1 }),
  astradbToken: t.String({ minLength: 1 }),
  astradbNamespace: t.String({ minLength: 1 }),
  mongodbUri: t.String({ minLength: 1 }),
  mongodbDbName: t.String({ minLength: 1 }),
  tursoUrl: t.String({ minLength: 1 }),
  tursoAuthToken: t.String({ minLength: 1 }),
  nasUrl: t.String({ minLength: 1 }),
  nasUsername: t.String({ minLength: 1 }),
  nasPassword: t.String({ minLength: 1 }),
};

export const CreateSchoolBody = t.Object({
  schoolName: t.String({ minLength: 3 }),
  subdomainSlug: t.String({ pattern: "^[a-z0-9-]+$", minLength: 3 }),
  planType: t.Union([
    t.Literal("CLASSIC"),
    t.Literal("PREMIUM"),
    t.Literal("CUSTOM"),
  ]),
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
    ...CredentialFieldsSchema,
  }),
);
export type UpdateSchoolDto = typeof UpdateSchoolBody.static;
