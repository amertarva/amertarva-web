import { nanoid } from "../../../infrastructure/crypto/nanoid";
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
    subdomainSlug,
    customDomain,
    superAdminEmail,
    initStatus,
    planType,
    status,
    maxStorageGb,
    storageAllocation,
    rentEndDate,
    ...credentialInput
  } = dto;

  // Validasi subdomainSlug
  if (subdomainSlug && subdomainSlug !== existing.subdomainSlug) {
    const slugTaken = await repo.findBySlug(subdomainSlug);
    if (slugTaken && slugTaken.schoolId !== schoolId) {
      throw new SchoolError("SLUG_TAKEN");
    }
  }

  // Validasi & mutasi customDomain
  let domainPatch: Record<string, any> = {};
  if (customDomain !== undefined) {
    const clean = customDomain?.toLowerCase().trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!clean) {
      domainPatch = {
        customDomain: null,
        customDomainStatus: "NONE",
        customDomainToken: null,
        customDomainVerifiedAt: null,
      };
    } else if (clean !== existing.customDomain) {
      const domainTaken = await repo.findByCustomDomain(clean);
      if (domainTaken && domainTaken.schoolId !== schoolId) {
        throw new SchoolError("DOMAIN_TAKEN");
      }
      domainPatch = {
        customDomain: clean,
        customDomainStatus: "PENDING_DNS",
        customDomainToken: nanoid(32),
        customDomainVerifiedAt: null,
      };
    }
  }

  const encrypted = encryptCredentials(
    enc,
    credentialInput as Record<string, string>,
  );

  const cleanStorageAllocation =
    storageAllocation !== undefined
      ? Array.from(new Set(["Supabase", ...storageAllocation]))
      : undefined;

  const updated = await repo.update(schoolId, {
    ...(schoolName !== undefined && { schoolName }),
    ...(subdomainSlug !== undefined && { subdomainSlug }),
    ...domainPatch,
    ...(superAdminEmail !== undefined && { superAdminEmail: superAdminEmail?.trim() || null }),
    ...(initStatus !== undefined && { initStatus }),
    ...(planType !== undefined && { planType }),
    ...(status !== undefined && { status }),
    ...(maxStorageGb !== undefined && { maxStorageGb }),
    ...(cleanStorageAllocation !== undefined && { storageAllocation: cleanStorageAllocation }),
    ...(rentEndDate !== undefined && { rentEndDate }),
    ...encrypted,
  });

  return toSchoolDetail(updated);
}
