import { ValidationEnvError } from "@/shared/errors/validationEnv-error";

type tipos = "string" | "number" | "boolean";

export interface InformacoesValidarItem {
  /**
   * Recebe o item que irá ser validado
   */
  item: any;

  /**
   * Recebe o tipo que o item deve ter
   */
  tipoDesejado: tipos;

  /**
   * Recebe a mensagem de erro que irá ser mostrada caso o item não seja o desejado
   */
  mensagemErro: string;
}

/**
 * Função responsável por validar se o item analisado contem o tipo desejado
 * @param informacoesValidarItem Recebe o objeto com as informações necessária para validação
 */
export const validarItem = (
  informacoesValidarItem: InformacoesValidarItem,
): any => {
  const { item, tipoDesejado, mensagemErro } = informacoesValidarItem;

  if (!item || typeof item != tipoDesejado)
    throw new ValidationEnvError(mensagemErro);

  return informacoesValidarItem.item;
};
