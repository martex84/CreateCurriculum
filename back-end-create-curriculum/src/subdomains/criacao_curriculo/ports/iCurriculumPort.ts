import { Curriculum } from "@criacao_curriculo/domain/entity/curriculum.entity";

export interface ICurriculumPort {
  criarCurriculum(html: string): Promise<Curriculum>;
}
