import type { ISchoolRepository } from "../../../domain/repositories/school.repository";
import { toSchoolSummary } from "../../mappers/school.mapper";

// List sekolah
export async function listSchoolsUseCase(repo: ISchoolRepository) {
  const schools = await repo.findAll();
  return schools.map(toSchoolSummary);
}
