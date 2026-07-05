import type { ILordAdminRepository } from "../../../domain/repositories/lord-admin.repository";
import type { AuthTokenPayload } from "../../../domain/entities/lord-admin.entity";
import { AuthError } from "./login.usecase";

// Refresh token
export async function refreshUseCase(
  repo: ILordAdminRepository,
  payload: AuthTokenPayload,
  signAccess: (id: string) => Promise<string>,
): Promise<{ accessToken: string }> {
  if (payload.type !== "refresh") throw new AuthError("INVALID_TOKEN");

  const admin = await repo.findById(payload.sub);
  if (!admin) throw new AuthError("INVALID_TOKEN");

  return { accessToken: await signAccess(admin.id) };
}
