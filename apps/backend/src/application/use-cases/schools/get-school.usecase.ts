import type { ISchoolRepository } from "../../../domain/repositories/school.repository";
import { toSchoolDetail } from "../../mappers/school.mapper";
import { SchoolError } from "./create-school.usecase";

// Detail sekolah
export async function getSchoolUseCase(
  repo: ISchoolRepository,
  schoolId: string,
) {
  const school = await repo.findById(schoolId);
  if (!school) throw new SchoolError("NOT_FOUND");
  return toSchoolDetail(school);
}
