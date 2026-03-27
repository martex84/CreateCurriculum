import { Request, Response } from "express";
import { Templates } from "@/features/templates/domain/templates.entity";
import { TiposTemplates } from "@/features/templates/types/tiposTemplates";
import { CriarTemplateUseCase } from "@templates/application/useCase/criarTemplate.useCase";

export class CriarcaoPdfService {
  async execution(request: Request, respose: Response) {
    const criarTemplateUseCase = new CriarTemplateUseCase();

    const template = await criarTemplateUseCase.execution(request);

    if (!template) respose.send("Falha na geração do template");
  }
}
