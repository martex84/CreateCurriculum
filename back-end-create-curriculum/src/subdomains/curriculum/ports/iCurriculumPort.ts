import { Curriculum } from "@/subdomains/curriculum/domain/entity/curriculum.entity";

export interface ICurriculumPort {
  criarCurriculum(html: string): Promise<Curriculum>;
}
