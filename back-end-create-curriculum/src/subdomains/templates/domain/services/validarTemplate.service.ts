import {
  TemplatePadrao,
  Templates,
} from "@/subdomains/templates/domain/entity/templates.entity";
import { mensageError } from "./validarTemplate.error";
import {
  TiposTemplates,
  valoresTiposTemplates,
} from "@/subdomains/templates/types/tiposTemplates";
import { ITemplatesRepositoryPort } from "@/subdomains/templates/ports/iTemplatesRepositoryPort";
import { ValidationError } from "@/shared/errors/validation-error";

/** @inheritdoc */
export const validarTemplateService: ITemplatesRepositoryPort["validarTemplateService"] =
  (
    dados: any,
  ): dados is {
    template: Templates;
    tipo: TiposTemplates;
  } => {
    try {
      //Realiza a validação básica do objeto recebido
      if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
        throw new Error(mensageError.DADOS_INVALIDOS);
      }

      const { tipo, template: dadosTemplate } = dados;

      if (!verificaTipoTemplate(tipo))
        throw new Error(mensageError.TIPO_INVALIDO);

      if (
        !dadosTemplate ||
        typeof dadosTemplate !== "object" ||
        Array.isArray(dadosTemplate)
      )
        throw new Error(mensageError.CAMPO_TEMPLATE_VAZIO);

      //Inicia a validação para o template do tipo "padrão"
      if (tipo === "padrao") {
        //Cria uma template para utilizar na validação
        const template: TemplatePadrao = {
          contato: {
            numero: "",
            email: "",
            linkdin: "",
          },
          nome: "",
          formacaoAcademica: "",
          resumoProfissional: "",
          idiomas: "",
          competencias: "",
          historicoProfissional: "",
          certificacoes: "",
        };

        Object.keys(template).forEach((key) => {
          const keysTemplate = Object.keys(dadosTemplate);

          const keyAtual = key as keyof TemplatePadrao;

          //Inicia a validação para o campo contato
          if (key === "contato") {
            if (!keysTemplate.includes(key))
              throw new Error(mensageError.CAMPO_INESISTENTE(key));

            Object.keys(template.contato).forEach((keyContato) => {
              const keysContatoTemplate = Object.keys(dadosTemplate.contato);

              const keyContatoAtual =
                keyContato as keyof TemplatePadrao["contato"];

              if (!keysContatoTemplate.includes(keyContato))
                throw new Error(mensageError.CAMPO_INESISTENTE(key));

              const valorContatoTemplate = dadosTemplate.contato[keyContato];

              if (
                typeof valorContatoTemplate !==
                typeof template.contato[keyContatoAtual]
              )
                throw new Error(mensageError.CAMPO_DIFERENTE(key));
            });
          }
          //Realiza a validação para os demais campos
          else {
            if (!keysTemplate.includes(key))
              throw new Error(mensageError.CAMPO_INESISTENTE(key));

            const valorTemplate = dadosTemplate[key];

            if (typeof valorTemplate !== typeof template[keyAtual])
              throw new Error(mensageError.CAMPO_DIFERENTE(key));
          }
        });
      }
      //Caso não seja encontrado o tipo do template irá retornar um erro
      else {
        throw new Error(mensageError.FALHA_TIPO_TEMPLATE);
      }

      return true;
    } catch (error) {
      const mensagemErro = error as Error;

      throw new ValidationError(
        `Os valores não corresponde ao dados de um template: [${mensagemErro.message}]`,
      );
    }
  };

/**
 * Verifica se o valore que está sendo validado é o tipo correto para os tipos de templates
 * @param tipo Recebe o valore que irá ser validado
 * @returns Retorna true para o caso onde o valor validado é igual ao tipo correto
 */
function verificaTipoTemplate(tipo: any): tipo is TiposTemplates {
  return valoresTiposTemplates.includes(tipo);
}
