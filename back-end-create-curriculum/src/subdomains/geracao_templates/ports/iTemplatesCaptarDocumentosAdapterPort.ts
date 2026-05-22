import { DadosTemplate } from "@geracao_templates/types/dadosTemplate";
import { TiposTemplates } from "@geracao_templates/types/tiposTemplates";

export interface ITemplatesCaptarDocumentosAdapterPort {
  captarHtmlCSS(tipoTemplate: TiposTemplates): Promise<DadosTemplate>;
}
