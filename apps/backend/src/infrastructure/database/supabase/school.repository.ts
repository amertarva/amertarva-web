import { supabase } from "./client";
import type { ISchoolRepository } from "../../../domain/repositories/school.repository";
import type { School } from "../../../domain/entities/school.entity";

const COLUMN_MAP: Record<keyof School, string> = {
  schoolId: "school_id",
  schoolName: "school_name",
  subdomainSlug: "subdomain_slug",
  planType: "plan_type",
  status: "status",
  maxStorageGb: "max_storage_gb",
  storageAllocation: "storage_allocation",
  supaTeachersUrl: "supa_teachers_url",
  supaTeachersKey: "supa_teachers_key",
  supaStudentsUrl: "supa_students_url",
  supaStudentsKey: "supa_students_key",
  supaClassesUrl: "supa_classes_url",
  supaClassesKey: "supa_classes_key",
  supaGradesUrl: "supa_grades_url",
  supaGradesKey: "supa_grades_key",
  astradbEndpoint: "astradb_endpoint",
  astradbToken: "astradb_token",
  astradbNamespace: "astradb_namespace",
  mongodbUri: "mongodb_uri",
  mongodbDbName: "mongodb_db_name",
  tursoUrl: "turso_url",
  tursoAuthToken: "turso_auth_token",
  nasUrl: "nas_url",
  nasUsername: "nas_username",
  nasPassword: "nas_password",
  initStatus: "init_status",
  initError: "init_error",
  superAdminEmail: "super_admin_email",
  createdAt: "created_at",
  updatedAt: "updated_at",
};

// Repository Schools Registry
export class SupabaseSchoolRepository implements ISchoolRepository {
  // Ambil semua sekolah
  async findAll(): Promise<School[]> {
    const { data } = await supabase
      .from("schools_registry")
      .select("*")
      .order("created_at", { ascending: false });
    return (data ?? []).map(rowToSchool);
  }

  // Cari by id
  async findById(schoolId: string): Promise<School | null> {
    const { data } = await supabase
      .from("schools_registry")
      .select("*")
      .eq("school_id", schoolId)
      .maybeSingle();
    return data ? rowToSchool(data) : null;
  }

  // Cari by slug
  async findBySlug(slug: string): Promise<School | null> {
    const { data } = await supabase
      .from("schools_registry")
      .select("*")
      .eq("subdomain_slug", slug)
      .maybeSingle();
    return data ? rowToSchool(data) : null;
  }

  // Buat sekolah
  async create(
    school: Omit<School, "createdAt" | "updatedAt">,
  ): Promise<School> {
    const { data, error } = await supabase
      .from("schools_registry")
      .insert(toRow(school))
      .select()
      .single();
    if (error) throw new Error(error.message);
    return rowToSchool(data);
  }

  // Update sekolah
  async update(schoolId: string, patch: Partial<School>): Promise<School> {
    const { data, error } = await supabase
      .from("schools_registry")
      .update(toRow(patch))
      .eq("school_id", schoolId)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return rowToSchool(data);
  }
}

// Mapping row (snake_case) -> entity (camelCase)
function rowToSchool(row: any): School {
  const result: any = {};
  for (const [key, col] of Object.entries(COLUMN_MAP)) {
    const val = row[col];
    if (key === "storageAllocation" && typeof val === "string") {
      result[key] = JSON.parse(val);
    } else {
      result[key] = val;
    }
  }
  return result as School;
}

// Mapping entity (camelCase) -> row (snake_case)
function toRow(entity: Partial<School>): Record<string, any> {
  const row: Record<string, any> = {};
  for (const [key, col] of Object.entries(COLUMN_MAP)) {
    if (key in entity) {
      const val = (entity as any)[key];
      row[col] = key === "storageAllocation" ? JSON.stringify(val) : val;
    }
  }
  return row;
}
