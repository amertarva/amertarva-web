import { nanoid } from "nanoid";
import type { ISchoolRepository } from "../../../domain/repositories/school.repository";
import type { IEncryptionService } from "../../../domain/services/encryption.service";
import type { CreateSchoolDto } from "../../dtos/school.dto";
import {
  encryptCredentials,
  toSchoolDetail,
} from "../../mappers/school.mapper";

export class SchoolError extends Error {}

// Buat sekolah baru
export async function createSchoolUseCase(
  repo: ISchoolRepository,
  enc: IEncryptionService,
  dto: CreateSchoolDto,
) {
  const existing = await repo.findBySlug(dto.subdomainSlug);
  if (existing) throw new SchoolError("SLUG_TAKEN");

  const encrypted = encryptCredentials(enc, dto);

  const school = await repo.create({
    schoolId: `SCH_${nanoid(10)}`,
    schoolName: dto.schoolName,
    subdomainSlug: dto.subdomainSlug,
    planType: dto.planType,
    maxStorageGb: dto.maxStorageGb ?? 5,
    storageAllocation: dto.storageAllocation ?? [],
    status: "PENDING",
    initStatus: "NOT_STARTED",
    initError: null,
    superAdminEmail: null,
    ...encrypted,
  } as any);

  return toSchoolDetail(school);
}
