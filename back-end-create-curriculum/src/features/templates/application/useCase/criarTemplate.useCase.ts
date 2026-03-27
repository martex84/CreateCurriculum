import { Request } from "express";
import { Templates } from "@/features/templates/domain/templates.entity";
import { TiposTemplates } from "@/features/templates/types/tiposTemplates";
import { validarTemplate } from "@/features/templates/utils/validarTemplate";

export class CriarTemplateUseCase {
  async execution(request: Request): Promise<string | undefined> {
    let template;

    try {
      const body = request.body;

      if (!body) throw new Error("Falha ao localizar os dados do body");

      if (!validarTemplate(body))
        throw new Error(
          "Os dados do body não corresponde ao dados de um template!",
        );

      // let template: Templates;
      // let tipoTemplates: TiposTemplates;
    } catch (error) {
      console.error(`Falha na geração do template [${error}]`);
    } finally {
      return template;
    }
  }
}
