import { Curriculum } from "@criacao_curriculo/domain/entity/curriculum.entity";
import { ICurriculumPort } from "@criacao_curriculo/ports/iCurriculumPort";

export class CriarCurriculumUseCase {
  constructor(private readonly ICurriculumPort: ICurriculumPort) {}

  async execution(html: string): Promise<Curriculum> {
    try {
      return await this.ICurriculumPort.criarCurriculum(html);
    } catch (error) {
      throw new Error(`Falha na geração do curriculum: ${error}`);
    }
  }
}
