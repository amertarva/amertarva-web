import type { School } from "../entities/school.entity";

export interface ISchoolRepository {
  findAll(): Promise<School[]>;
  findById(schoolId: string): Promise<School | null>;
  findBySlug(slug: string): Promise<School | null>;
  create(school: Omit<School, "createdAt" | "updatedAt">): Promise<School>;
  update(schoolId: string, patch: Partial<School>): Promise<School>;
}
