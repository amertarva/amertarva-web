import type { LordAdmin } from "../entities/lord-admin.entity";

export interface ILordAdminRepository {
  findByEmail(email: string): Promise<LordAdmin | null>;
  findById(id: string): Promise<LordAdmin | null>;
  update(id: string, patch: Partial<LordAdmin>): Promise<LordAdmin>;
}
