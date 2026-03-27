import {
  TemplatePadrao,
  Templates,
} from "@/features/templates/domain/templates.entity";
import { TiposTemplates } from "@/features/templates/types/tiposTemplates";

/**
 * Função responsável por validar se os dados passados são do tipo template
 * @param dados Recebe os dados que serão validados
 * @returns Retorna verdadeiro ou falos para os dados sejam do tipo template
 */
export function validarTemplate(dados: any): dados is {
  template: Templates;
  tipo: TiposTemplates;
} {
  try {
    //Realiza a validação básica do objeto recebido
    if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
      throw new Error("Os dados fornecidos devem ser um objeto válido.");
    }

    const { tipo, template: dadosTemplate } = dados;

    if (tipo !== "padrao") {
      throw new Error("Tipo de template desconhecido ou não suportado.");
    }

    if (
      !dadosTemplate ||
      typeof dadosTemplate !== "object" ||
      Array.isArray(dadosTemplate)
    )
      throw new Error("O campo 'template' deve ser um objeto preenchido.");

    //Inicia a validação para o template do tipo "padrão"
    if (dados.tipo === "padrao") {
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
            throw new Error(
              `O campo '${key}' não existe no template informado!`,
            );

          Object.keys(template.contato).forEach((keyContato) => {
            const keysContatoTemplate = Object.keys(dadosTemplate.contato);

            const keyContatoAtual =
              keyContato as keyof TemplatePadrao["contato"];

            if (!keysContatoTemplate.includes(keyContato))
              throw new Error(
                `O campo '${keyContato}' não existe no template informado!`,
              );

            const valorContatoTemplate = dadosTemplate.contato[keyContato];

            if (
              typeof valorContatoTemplate !==
              typeof template.contato[keyContatoAtual]
            )
              throw new Error(
                `O tipo do campo '${key}' é diferente do esperado!`,
              );
          });
        }
        //Realiza a validação para os demais campos
        else {
          if (!keysTemplate.includes(key))
            throw new Error(
              `O campo '${key}' não existe no template informado!`,
            );

          const valorTemplate = dadosTemplate[key];

          if (typeof valorTemplate !== typeof template[keyAtual])
            throw new Error(
              `O tipo do campo '${key}' é diferente do esperado!`,
            );
        }
      });
    }
    //Caso não seja encontrado o tipo do template irá retornar um erro
    else {
      throw new Error("Falha ao tentar identificar o tipo de template");
    }

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}
