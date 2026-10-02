import dns from "node:dns/promises";
import crypto from "node:crypto";
import type { ISchoolRepository } from "../../../domain/repositories/school.repository";
import { toSchoolDetail } from "../../mappers/school.mapper";
import { SchoolError } from "./create-school.usecase";

// Setup / Ganti Custom Domain
export async function setCustomDomainUseCase(
  repo: ISchoolRepository,
  schoolId: string,
  customDomain: string
) {
  const normalizedDomain = customDomain.toLowerCase().trim();
  const existing = await repo.findById(schoolId);
  if (!existing) throw new SchoolError("NOT_FOUND");

  // Cek apakah domain sudah dipakai sekolah lain
  const domainTaken = await repo.findByCustomDomain(normalizedDomain);
  if (domainTaken && domainTaken.schoolId !== schoolId) {
    throw new SchoolError("DOMAIN_TAKEN");
  }

  // Generate verification token
  const token = `amr_vfy_${crypto.randomBytes(12).toString("hex")}`;

  const updated = await repo.update(schoolId, {
    customDomain: normalizedDomain,
    customDomainStatus: "PENDING_DNS",
    customDomainToken: token,
    customDomainVerifiedAt: null,
  });

  return toSchoolDetail(updated);
}

// Hapus Custom Domain
export async function removeCustomDomainUseCase(
  repo: ISchoolRepository,
  schoolId: string
) {
  const existing = await repo.findById(schoolId);
  if (!existing) throw new SchoolError("NOT_FOUND");

  const updated = await repo.update(schoolId, {
    customDomain: null,
    customDomainStatus: "NONE",
    customDomainToken: null,
    customDomainVerifiedAt: null,
  });

  return toSchoolDetail(updated);
}

// Verifikasi DNS (CNAME / TXT challenge)
export async function verifyCustomDomainUseCase(
  repo: ISchoolRepository,
  schoolId: string
) {
  const school = await repo.findById(schoolId);
  if (!school) throw new SchoolError("NOT_FOUND");
  if (!school.customDomain) throw new SchoolError("NO_CUSTOM_DOMAIN");

  const domain = school.customDomain;
  let isVerified = false;
  let verificationMethod = "";
  const errors: string[] = [];

  // 1. Cek CNAME (misal mengarah ke cname.amertarva.com atau amertarva.com)
  try {
    const cnames = await dns.resolveCname(domain);
    if (cnames.some((c) => c.toLowerCase().includes("amertarva.com"))) {
      isVerified = true;
      verificationMethod = "CNAME";
    }
  } catch (err: any) {
    errors.push(`CNAME check: ${err.code || err.message}`);
  }

  // 2. Cek TXT Record jika CNAME belum terverifikasi
  if (!isVerified && school.customDomainToken) {
    try {
      const challengeDomain = `_amertarva-challenge.${domain}`;
      const txtRecords = await dns.resolveTxt(challengeDomain);
      const flattened = txtRecords.flat();
      if (flattened.includes(school.customDomainToken)) {
        isVerified = true;
        verificationMethod = "TXT";
      }
    } catch (err: any) {
      errors.push(`TXT challenge check: ${err.code || err.message}`);
    }
  }

  // 3. Fallback Cek A Record / Host lookup (untuk dev/custom staging environment)
  if (!isVerified) {
    try {
      const addresses = await dns.lookup(domain);
      if (addresses && addresses.address) {
        // Jika domain sudah me-resolve IP apapun dan token cocok atau dalam environment dev
        if (process.env.NODE_ENV === "development" || process.env.ALLOW_DEV_DOMAIN_VERIFY === "true") {
          isVerified = true;
          verificationMethod = "DNS_A_DEV";
        }
      }
    } catch (err: any) {
      errors.push(`DNS lookup: ${err.code || err.message}`);
    }
  }

  if (isVerified) {
    const updated = await repo.update(schoolId, {
      customDomainStatus: "ACTIVE",
      customDomainVerifiedAt: new Date().toISOString(),
    });
    return {
      success: true,
      verified: true,
      method: verificationMethod,
      school: toSchoolDetail(updated),
    };
  }

  return {
    success: false,
    verified: false,
    message: "DNS record belum mengarah ke Amertarva atau sedang dalam propagasi DNS (butuh 5-60 menit).",
    diagnostics: errors,
    school: toSchoolDetail(school),
  };
}
