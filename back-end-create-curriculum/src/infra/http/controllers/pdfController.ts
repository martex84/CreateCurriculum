import { Request, Response } from "express";
import { IGeracaoTemplatesFactory } from "@/subdomains/geracao_templates/ports/IGeracaoTemplatesFactory";
import { ICurriculumFactory } from "@/subdomains/criacao_curriculo/ports/ICurriculumFactory";
import { Curriculum } from "@/subdomains/criacao_curriculo/domain/entity/curriculum.entity";
import { makeGeracaoLogUseCase } from "@geracao_log/";

export class PdfController {
  constructor(
    private readonly makeCreateTemplates: IGeracaoTemplatesFactory,
    private readonly makeCrateCurriculum: ICurriculumFactory,
  ) {}

  async handle(request: Request, respose: Response) {
    let dadosResponse: Curriculum = {
      arquivo: "",
      error: {
        isError: false,
        messageError: "",
      },
    };

    try {
      const log = makeGeracaoLogUseCase();

      await log.execution("Captando dados do body");

      const body = request.body;

      if (!body) throw new Error("Falha ao localizar os dados do body");

      const { criarTemplateUseCase } = this.makeCreateTemplates;

      const templateHtml = await criarTemplateUseCase.execute(body);

      if (templateHtml) {
        const { criarCurriculumUseCase } = this.makeCrateCurriculum;

        const curriculo = await criarCurriculumUseCase.execution(templateHtml);

        if (curriculo) {
          dadosResponse = curriculo;
        } else throw new Error("Falha na geração do curriculo");
      } else throw new Error("Falha na geração do template");
    } catch (error: any) {
      dadosResponse.error = {
        isError: true,
        messageError: error.message,
      };
    } finally {
      respose.send(dadosResponse);
    }
  }
}
