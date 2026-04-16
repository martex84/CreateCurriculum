import { Request, Response } from "express";
import log from "@/config/log";
import { MakeCreateTemplates } from "@/main/factories/makeCreateTemplates";
import { MakeCreateCurriculum } from "@/main/factories/makeCreateCurriculum";

export class PdfController {
  constructor(
    private readonly makeCreateTemplates: MakeCreateTemplates,
    private readonly makeCrateCurriculum: MakeCreateCurriculum,
  ) {}

  async handle(request: Request, respose: Response) {
    log("Captando dados do body");

    const body = request.body;

    if (!body) throw new Error("Falha ao localizar os dados do body");

    const { criarTemplateUseCase } = this.makeCreateTemplates;

    const templateHtml = await criarTemplateUseCase.execute(body);

    if (templateHtml) {
      const { criarCurriculumUseCase } = this.makeCrateCurriculum;

      const curriculo = await criarCurriculumUseCase.execution(templateHtml);

      if (curriculo) {
        respose.send(curriculo);
      } else respose.send("Falha na geração do curriculo");
    } else respose.send("Falha na geração do template");
  }
}
