import { DadosTemplate } from "@/subdomains/templates/types/dadosTemplate";
import { TiposTemplates } from "@/subdomains/templates/types/tiposTemplates";

export interface ITemplatesCaptarDocumentosAdapterPort {
  captarHtmlCSS(tipoTemplate: TiposTemplates): Promise<DadosTemplate>;
}
