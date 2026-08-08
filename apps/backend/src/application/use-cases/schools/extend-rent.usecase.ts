import type { ISchoolRepository } from "../../../domain/repositories/school.repository";
import { addMonths } from "../../../domain/entities/school.entity";
import { toSchoolDetail } from "../../mappers/school.mapper";
import { SchoolError } from "./create-school.usecase";

/**
 * Perpanjang durasi sewa sekolah.
 *
 * Logika:
 * - Jika rentEndDate masih di masa depan → tambah dari rentEndDate
 * - Jika rentEndDate sudah lewat (expired) → tambah dari sekarang (reaktivasi)
 */
export async function extendRentUseCase(
  repo: ISchoolRepository,
  schoolId: string,
  extendMonths: number,
) {
  const school = await repo.findById(schoolId);
  if (!school) throw new SchoolError("NOT_FOUND");

  const now = new Date();

  // Basis perpanjangan: ambil tanggal yang lebih besar antara sekarang dan akhir sewa saat ini
  const currentEnd = school.rentEndDate ? new Date(school.rentEndDate) : now;
  const base = currentEnd > now ? currentEnd : now;
  const newEndDate = addMonths(base, extendMonths);

  // Total durasi = durasi lama + penambahan
  const prevDuration = school.rentDurationMonths ?? 0;
  const newDuration = prevDuration + extendMonths;

  const updated = await repo.update(schoolId, {
    rentEndDate: newEndDate.toISOString(),
    rentDurationMonths: newDuration,
    // Jika sekolah expired dan diperpanjang, reset start ke sekarang
    ...((!school.rentStartDate || currentEnd <= now) && {
      rentStartDate: now.toISOString(),
    }),
  });

  return toSchoolDetail(updated);
}
