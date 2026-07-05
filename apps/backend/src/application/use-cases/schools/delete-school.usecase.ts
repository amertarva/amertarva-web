import type { ISchoolRepository } from "../../../domain/repositories/school.repository";
import { SchoolError } from "./create-school.usecase";

// Nonaktifkan sekolah (soft delete)
export async function deleteSchoolUseCase(
  repo: ISchoolRepository,
  schoolId: string,
) {
  const existing = await repo.findById(schoolId);
  if (!existing) throw new SchoolError("NOT_FOUND");
  await repo.update(schoolId, { status: "SUSPENDED" });
}
