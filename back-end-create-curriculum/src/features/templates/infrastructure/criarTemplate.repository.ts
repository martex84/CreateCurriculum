import { Templates } from "@/features/templates/domain/entity/templates.entity";
import { TemplatesReposity } from "@/features/templates/domain/repository/templates.reposity";
import { TiposTemplates } from "@/features/templates/types/tiposTemplates";

export class CriarTemplateRepository implements TemplatesReposity {
  criarHTMLTemplate(
    template: Templates,
    tipoTemplates: TiposTemplates,
  ): Promise<string> {
    throw new Error("Teste");
  }
}
