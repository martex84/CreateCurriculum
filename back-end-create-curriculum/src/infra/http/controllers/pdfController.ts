import { Request, Response } from "express";
import log from "@/config/log";
import { makeCreateTemplates } from "@/main/factories/makeCreateTemplates";
import { makeCrateCurriculum } from "@/main/factories/makeCreateCurriculum";

export class PdfController {
  async handle(request: Request, respose: Response) {
    log("Captando dados do body");

    const body = request.body;

    if (!body) throw new Error("Falha ao localizar os dados do body");

    const { criarTemplateUseCase } = makeCreateTemplates();

    const templateHtml = await criarTemplateUseCase.execute(body);

    if (templateHtml) {
      const { criarCurriculumUseCase } = makeCrateCurriculum();

      const curriculo = await criarCurriculumUseCase.execution(templateHtml);

      if (curriculo) {
        respose.send(curriculo);
      } else respose.send("Falha na geração do curriculo");
    } else respose.send("Falha na geração do template");
  }
}
