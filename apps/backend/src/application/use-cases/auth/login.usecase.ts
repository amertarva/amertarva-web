import type { ILordAdminRepository } from "../../../domain/repositories/lord-admin.repository";
import type { AuthResult } from "../../dtos/auth.dto";

export class AuthError extends Error {}

// Login
export async function loginUseCase(
  repo: ILordAdminRepository,
  email: string,
  password: string,
  signAccess: (id: string) => Promise<string>,
  signRefresh: (id: string) => Promise<string>,
): Promise<AuthResult> {
  const admin = await repo.findByEmail(email);
  if (!admin) throw new AuthError("INVALID_CREDENTIALS");

  const valid = await Bun.password.verify(password, admin.password);
  if (!valid) throw new AuthError("INVALID_CREDENTIALS");

  return {
    accessToken: await signAccess(admin.id),
    refreshToken: await signRefresh(admin.id),
    admin: { id: admin.id, email: admin.email, name: admin.name },
  };
}
