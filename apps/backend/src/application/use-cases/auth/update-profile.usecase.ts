import type { ILordAdminRepository } from "../../../domain/repositories/lord-admin.repository";
import { AuthError } from "./login.usecase";

export interface UpdateProfileInput {
  name?: string;
  email?: string;
}

export async function updateProfileUseCase(
  repo: ILordAdminRepository,
  adminId: string,
  input: UpdateProfileInput
) {
  const admin = await repo.findById(adminId);
  if (!admin) throw new AuthError("ADMIN_NOT_FOUND");

  const patch: Record<string, any> = {};

  if (input.name && input.name.trim() !== "") {
    patch.name = input.name.trim();
  }

  if (input.email && input.email.trim().toLowerCase() !== admin.email.toLowerCase()) {
    const newEmail = input.email.trim().toLowerCase();
    const existing = await repo.findByEmail(newEmail);
    if (existing && existing.id !== adminId) {
      throw new AuthError("EMAIL_ALREADY_IN_USE");
    }
    patch.email = newEmail;
  }

  if (Object.keys(patch).length === 0) {
    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    };
  }

  const updated = await repo.update(adminId, patch);

  return {
    id: updated.id,
    name: updated.name,
    email: updated.email,
  };
}
