import type { ILordAdminRepository } from "../../../domain/repositories/lord-admin.repository";
import { AuthError } from "./login.usecase";

export async function getMeUseCase(
  repo: ILordAdminRepository,
  adminId: string
) {
  const admin = await repo.findById(adminId);
  if (!admin) throw new AuthError("ADMIN_NOT_FOUND");

  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    createdAt: admin.createdAt,
  };
}
