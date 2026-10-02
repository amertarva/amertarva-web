import type { ILordAdminRepository } from "../../../domain/repositories/lord-admin.repository";
import { AuthError } from "./login.usecase";

export interface UpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export async function updatePasswordUseCase(
  repo: ILordAdminRepository,
  adminId: string,
  input: UpdatePasswordInput
) {
  const admin = await repo.findById(adminId);
  if (!admin) throw new AuthError("ADMIN_NOT_FOUND");

  const valid = await Bun.password.verify(input.currentPassword, admin.password);
  if (!valid) {
    throw new AuthError("INVALID_CURRENT_PASSWORD");
  }

  if (input.newPassword.length < 8) {
    throw new AuthError("PASSWORD_TOO_SHORT");
  }

  const hashedPassword = await Bun.password.hash(input.newPassword, {
    algorithm: "bcrypt",
    cost: 10,
  });

  await repo.update(adminId, { password: hashedPassword });

  return { success: true, message: "Kata sandi berhasil diperbarui" };
}
