import { TiposTemplates } from "@templates/types/tiposTemplates";
import { Templates } from "@/subdomains/templates/domain/entity/templates.entity";

export interface ITemplatesRepositoryPort {
  /**
   * Função responsável por gerar um HTML com base no template escolhido os dados informados
   * @param template Recebe o objeto com os dados do template
   * @param tipoTemplates Recebe o tipo de template que irá ser utilizado
   * @returns Retorna uma string contendo o html para geração do template
   */
  criarHTMLTemplate(
    template: Templates,
    tipoTemplates: TiposTemplates,
  ): Promise<string>;
}
