export const errors = {
  caminhoInvalido: "O caminho informado é inválido ou não pertence ao projeto!",
};

/**
 * Função responsável por validar se o parametro pertence a um caminho do projeto
 * @returns Retorna true para o caso do caminho pertencer ao projeto
 */
export function validarPath(path: string): boolean {
  if (!path.includes(process.cwd())) throw new Error(errors.caminhoInvalido);

  return true;
}
