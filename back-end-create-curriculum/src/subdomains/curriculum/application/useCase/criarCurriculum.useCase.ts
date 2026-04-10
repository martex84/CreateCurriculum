import { Curriculum } from "@/subdomains/curriculum/domain/entity/curriculum.entity";

export class CriarCurriculumUseCase {
  async execution(html: string): Promise<Curriculum> {
    let curriculum: Curriculum = {
      arquivo: "",
      error: {
        isError: false,
        messageError: "",
      },
    };

    try {
      return curriculum;
    } catch (error) {
      throw new Error(`Falha na geração do curriculum: ${error}`);
    }
  }
}
