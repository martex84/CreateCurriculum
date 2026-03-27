import { TemplatePadrao } from "@/features/templates/domain/templates.entity";

/**
 * Função responsável por validar se os dados passados são do tipo template
 * @param dados Recebe os dados que serão validados
 * @returns Retorna verdadeiro ou falos para os dados sejam do tipo template
 */
export function validarTemplate(dados: any): boolean {
  try {
    if (typeof dados !== "object" && Object.keys(dados).length === 0)
      throw new Error("Falha na captação dos dados do body");

    const dadosTemplate = dados.template;

    if (
      typeof dadosTemplate !== "object" &&
      Object.keys(dadosTemplate).length === 0
    )
      throw new Error("Falha na captação dos dados do template");

    if (dados.tipo === "padrao") {
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
        } else {
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
    } else {
      throw new Error("Falha ao tentar identificar o tipo de template");
    }

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
}
