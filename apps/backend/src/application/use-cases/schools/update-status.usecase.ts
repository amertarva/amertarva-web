import type { ISchoolRepository } from "../../../domain/repositories/school.repository";
import type { SchoolStatus, SuspensionReason } from "../../../domain/entities/school.entity";
import { toSchoolDetail } from "../../mappers/school.mapper";
import { SchoolError } from "./create-school.usecase";

export interface UpdateStatusInput {
  status: SchoolStatus;
  suspensionReason?: SuspensionReason;
  suspensionNotice?: string;
}

export async function updateSchoolStatusUseCase(
  repo: ISchoolRepository,
  schoolId: string,
  input: UpdateStatusInput
) {
  const existing = await repo.findById(schoolId);
  if (!existing) throw new SchoolError("NOT_FOUND");

  const patch: Record<string, any> = {
    status: input.status,
  };

  if (input.status === "ACTIVE") {
    // Reset suspension reason & notice saat re-aktif
    patch.suspensionReason = null;
    patch.suspensionNotice = null;
  } else {
    if (input.suspensionReason) patch.suspensionReason = input.suspensionReason;
    if (input.suspensionNotice !== undefined) patch.suspensionNotice = input.suspensionNotice;
  }

  const updated = await repo.update(schoolId, patch);
  return toSchoolDetail(updated);
}
