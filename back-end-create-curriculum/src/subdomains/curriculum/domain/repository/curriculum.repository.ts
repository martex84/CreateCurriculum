import { Curriculum } from "@/subdomains/curriculum/domain/entity/curriculum.entity";

export interface CurriculumRepository {
  criarCurriculum(html: string): Promise<Curriculum>;
}
