import { nanoid } from "../../../infrastructure/crypto/nanoid";
import { randomBytes } from "node:crypto";
import type { ISchoolRepository } from "../../../domain/repositories/school.repository";
import type { IEncryptionService } from "../../../domain/services/encryption.service";
import type { CreateSchoolDto } from "../../dtos/school.dto";
import { addMonths } from "../../../domain/entities/school.entity";
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

  let customDomain: string | null = null;
  let customDomainStatus: "NONE" | "PENDING_DNS" | "ACTIVE" = "NONE";
  let customDomainToken: string | null = null;

  if (dto.customDomain && dto.customDomain.trim() !== "") {
    const cleanDomain = dto.customDomain
      .toLowerCase()
      .trim()
      .replace(/^https?:\/\//, "")
      .replace(/\/.*$/, "");

    const existingDomain = await repo.findByCustomDomain(cleanDomain);
    if (existingDomain) throw new SchoolError("DOMAIN_TAKEN");

    customDomain = cleanDomain;
    customDomainStatus = "PENDING_DNS";
    customDomainToken = nanoid(32);
  }

  const encrypted = encryptCredentials(enc, dto);

  // Hitung tanggal sewa
  const rentStartDate = new Date();
  const rentEndDate = addMonths(rentStartDate, dto.rentDurationMonths);

  const storageAllocation = Array.from(
    new Set(["Supabase", ...(dto.storageAllocation ?? [])])
  );

  // Generate Server API Key unik per sekolah (untuk autentikasi Server-to-Server)
  const serverApiKey = `amsch_${randomBytes(24).toString("hex")}`;

  const school = await repo.create({
    schoolId: `SCH_${nanoid(10)}`,
    schoolName: dto.schoolName,
    subdomainSlug: dto.subdomainSlug,
    customDomain,
    customDomainStatus,
    customDomainToken,
    planType: dto.planType,
    maxStorageGb: dto.maxStorageGb ?? 5,
    storageAllocation,
    status: "PENDING",
    serverApiKey,
    rentDurationMonths: dto.rentDurationMonths,
    rentStartDate: rentStartDate.toISOString(),
    rentEndDate: rentEndDate.toISOString(),
    initStatus: "NOT_STARTED",
    initError: null,
    superAdminEmail: dto.superAdminEmail ?? null,
    ...encrypted,
  } as any);

  return toSchoolDetail(school);
}
