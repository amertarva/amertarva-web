import { supabase } from "./client";
import type { ILordAdminRepository } from "../../../domain/repositories/lord-admin.repository";
import type { LordAdmin } from "../../../domain/entities/lord-admin.entity";

// Repository Lord Admin
export class SupabaseLordAdminRepository implements ILordAdminRepository {
  // Cari by email
  async findByEmail(email: string): Promise<LordAdmin | null> {
    const { data } = await supabase
      .from("lord_admins")
      .select("*")
      .eq("email", email)
      .maybeSingle();
    return data as LordAdmin | null;
  }

  // Cari by id
  async findById(id: string): Promise<LordAdmin | null> {
    const { data } = await supabase
      .from("lord_admins")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    return data as LordAdmin | null;
  }

  // Update data Lord Admin
  async update(id: string, patch: Partial<LordAdmin>): Promise<LordAdmin> {
    const { data, error } = await supabase
      .from("lord_admins")
      .update(patch)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as LordAdmin;
  }
}
