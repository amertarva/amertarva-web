import type { ISchoolRepository } from "../../../domain/repositories/school.repository";
import type { IEncryptionService } from "../../../domain/services/encryption.service";
import type { UpdateSchoolDto } from "../../dtos/school.dto";
import {
  encryptCredentials,
  toSchoolDetail,
} from "../../mappers/school.mapper";
import { SchoolError } from "./create-school.usecase";

// Update sekolah — field kredensial kosong tidak menimpa nilai lama
export async function updateSchoolUseCase(
  repo: ISchoolRepository,
  enc: IEncryptionService,
  schoolId: string,
  dto: UpdateSchoolDto,
) {
  const existing = await repo.findById(schoolId);
  if (!existing) throw new SchoolError("NOT_FOUND");

  const {
    schoolName,
    planType,
    status,
    maxStorageGb,
    storageAllocation,
    ...credentialInput
  } = dto;
  const encrypted = encryptCredentials(
    enc,
    credentialInput as Record<string, string>,
  );

  const updated = await repo.update(schoolId, {
    ...(schoolName !== undefined && { schoolName }),
    ...(planType !== undefined && { planType }),
    ...(status !== undefined && { status }),
    ...(maxStorageGb !== undefined && { maxStorageGb }),
    ...(storageAllocation !== undefined && { storageAllocation }),
    ...encrypted,
  });

  return toSchoolDetail(updated);
}
