import path from "node:path";

/**
 * Função responsável por captar o caminho para a pasta de templates;
 * @returns Retorna a string com o caminho para a pasta de templates
 */
export const getTemplatePath = (): string => {
  return path.resolve(__dirname, "..", "..", "templates") + "/";
};
