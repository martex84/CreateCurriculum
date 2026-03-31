import { Request, Response } from "express";
import { CriarTemplateUseCase } from "@templates/application/useCase/criarTemplate.useCase";

export class CriacaoPdfService {
  async execution(request: Request, respose: Response) {
    const criarTemplateUseCase = new CriarTemplateUseCase();

    const templateHtml = await criarTemplateUseCase.execution(request);

    if (templateHtml) {
      respose.send("HTML Gerado com sucesso");
    } else respose.send("Falha na geração do template");
  }
}
